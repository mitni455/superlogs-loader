/**
* @requires Config 
**/
import { CONFIG } from '@master-class/config';


import { file, booleanLiteral } from '@babel/types';

/**
 * @import Redux
 */
import {
	/* Action interfaces */
	ISetRootFolderAction,
	IFetchFileTreePendingAction,
	IFetchFileTreeSuccessAction,
	IFetchFileTreeErrorAction,
	IFetchFilePendingAction,
	IFetchFileSuccessAction,
	IFetchFileErrorAction,
	ICreateTemporaryFileEntryAction,
	ISetSelectedFileTreeNodeAction,
	ISetFileInEditAction,
	ISetFileContentAction,
	ISetFileCompiledContentAction,

	/* State */
	IFileStorageStore,

	/* Constants */
	SET_ROOT_FOLDER,
	FETCH_FILE_TREE_PENDING,
	FETCH_FILE_TREE_SUCCESS,
	FETCH_FILE_TREE_ERROR,
	FETCH_FILE_PENDING,
	FETCH_FILE_SUCCESS,
	FETCH_FILE_ERROR,
	CREATE_TEMPORARY_FILE_ENTRY,
	CREATE_FILE_IS_AWAITING_NAME,
	CREATE_FOLDER_IS_AWAITING_NAME,
	CREATE_UNSAVED_FILE,
	SET_SELECTED_FILE_TREE_NODE,
	SET_FILE_IN_EDIT,
	SET_FILE_CONTENT,
	SET_FILE_COMPILED_CONTENT,
	SAVE_FILE_NAME_PENDING,
	SAVE_FILE_NAME_ERROR,
	SAVE_FILE_NAME_SUCCESS,
	VALIDATE_FILE_NAME_SUCCESS,
	VALIDATE_FILE_NAME_ERROR,

	/**
	 * @author Mitchy 
	 * Toggle shown file tree between Blueprint and App 
	 */
	TOGGLE_FILETREE,
} from '../types';

/**
 * @import Models
 */
import {
	IFileStorageFile,
	IMicroserviceStorageSuccess,
	IMicroserviceStorageFile,
	IMicroserviceStorageFileDetail,
	IMicroserviceStorageGitCheckout,
	IFileStorageEntry
} from '@master-class/models';

/**
 * @import Services
 */
import {
	FileStorageService
} from '@master-class/services';

/**
 * @import Samples
 */
import {
	getFolderTree
} from '@master-class/samples';


/**
 * @import Store
 */
import { store } from '../store';

import socketIOClient from "socket.io-client";

const FOLDER_NESTING_LEVEL: number = 4;

// -- Socket setup
let folderWatcherSocket: any;

(() => {
	if (CONFIG.MICROSERVICE_FOLDER_WATCHER_URL) {
		const socketURL = CONFIG.MICROSERVICE_FOLDER_WATCHER_URL + "?projectId=1&tier=client&app=angular&sshServiceName=microservice-ubuntu-ssh";

		folderWatcherSocket = socketIOClient(socketURL);

		folderWatcherSocket.on('connect', function () {
			console.log(" 🦄  We are connected to the folder watcher!!");
		});

		folderWatcherSocket.on('addDir', (pathId: string) => {
			console.log(" 🦄  Directory was added at path id :", pathId);
		});

		folderWatcherSocket.on('deleteDir', (pathId: string) => {
			console.log(" 🦄  Directory was deleted at path id : ", pathId);
		});

		folderWatcherSocket.on('addFile', (pathId: string) => {
			console.log(" 🦄  File was added at path id : ", pathId);
		});

		folderWatcherSocket.on('changeFile', (pathId: string) => {
			console.log(" 🦄  File was changed at path id : ", pathId);
		});

		folderWatcherSocket.on('deleteFile', (pathId: string) => {
			console.log(" 🦄  File was delete at path id : ", pathId);
		});

		folderWatcherSocket.on('error', (error: any) => {
			console.log(" 🦄  There was an error : ", error);
		});
	}
});


export function setRootFolderAction(isBlueprint: boolean, rootFolder: IFileStorageFile): ISetRootFolderAction {
	return {
		type: SET_ROOT_FOLDER,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function fetchFileTreePending(isBlueprint: boolean): IFetchFileTreePendingAction {
	return {
		type: FETCH_FILE_TREE_PENDING,
		isBlueprint: isBlueprint
	}
}

export function fetchFileTreeSuccess(isBlueprint: boolean, rootFolder: IFileStorageFile): IFetchFileTreeSuccessAction {
	return {
		type: FETCH_FILE_TREE_SUCCESS,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function fetchFileTreeError(isBlueprint: boolean, error: any): IFetchFileTreeErrorAction {
	return {
		type: FETCH_FILE_TREE_ERROR,
		isBlueprint: isBlueprint,
		error: error
	}
}

/**
 * 
 * @param projectId 
 * @param path 
 * @param isBlueprint 
 * @param isStarterKit 
 * @returns 
 */
export function fetchFileTree(
	projectId: string,
	path: string,
	isBlueprint: boolean,
	isStarterKit: boolean = false
): any {

	return async (dispatch: any) => {
		/**
		 * @method fetchFileTree
		 * @desc fetch the file tree
		 */
		try {
			/**
			 * @step fetch the file tree
			 */

			/**
			 * @dispatch fetchFileTreePending(isBlueprint)
			 */
			dispatch(fetchFileTreePending(isBlueprint));

			/**
			 * @goto FileStorageService.apiGetFolder
			 */
			let resultJson: any = await FileStorageService.apiGetFolder(projectId, path);
			/**
			 * @data resultJson
			 */

			const treeData: IMicroserviceStorageFile[] = resultJson.data;
			/**
			 * @data treeData
			 */
			
			/** 
			 * @step Begin processing the folder structure to fit treebeard
			 */
			const treeDataStructured: IFileStorageFile = await buildRootFolder(
				projectId,
				isBlueprint,
				path,
				treeData,
				isStarterKit
			);
			treeDataStructured.active = true;
			treeDataStructured.toggled = true;
			/**
			 * @data treeDataStructured
			 */

			/**
			 * @dispatch dispatch(fetchFileTreeSuccess(isBlueprint, treeDataStructured));
			 */
			dispatch(fetchFileTreeSuccess(isBlueprint, treeDataStructured));

			return treeData;
		}
		catch (err) {
			/**
			 * @error err
			 */
			if (err instanceof SyntaxError) {
				console.error("[PlaybookActions.fetchFileTree]  💀 Couldn't find or parse the json bro: ", {
					'err.message': (
						err.message == 'Unexpected token < in JSON at position 0' ?
							'I cannot parse JSON because I didnt get any JSON yaow' :
							err.message
					)
				});
			}
			else {
				console.error("[PlaybookActions.fetchFileTree]  @error: ", err);
			}

			/**
			 * @dispatch fetchFileTreeError(isBlueprint, err)
			 */
			dispatch(fetchFileTreeError(isBlueprint, err));

			/**
			 * @throws err
			 */
			throw err;
		}
	}

}

export function fetchFilePending(path: string, fileName: string, isBlueprint: boolean): IFetchFilePendingAction {
	return {
		type: FETCH_FILE_PENDING,
		path: path,
		fileName: fileName,
		isBlueprint: isBlueprint
	}
}

export function fetchFileSuccess(path: string, fileName: string, isBlueprint: boolean, fileData: IMicroserviceStorageFileDetail): IFetchFileSuccessAction {
	return {
		type: FETCH_FILE_SUCCESS,
		path: path,
		fileName: fileName,
		isBlueprint: isBlueprint,
		fileData: fileData
	}
}

export function fetchFileError(path: string, fileName: string, isBlueprint: boolean, error: any): IFetchFileErrorAction {
	return {
		type: FETCH_FILE_ERROR,
		path: path,
		fileName: fileName,
		isBlueprint: isBlueprint,
		error: error
	}
}

export function createTemporaryFileEntryAction(isBlueprint: boolean): ICreateTemporaryFileEntryAction {
	return {
		type: CREATE_TEMPORARY_FILE_ENTRY,
		isBlueprint: isBlueprint
	}
}

export function createFileIsAwaitingName(path: string): any {
	return {
		type: CREATE_FILE_IS_AWAITING_NAME,
		path: path
	}
}

export function createFolderIsAwaitingName(path: string): any {
	return {
		type: CREATE_FOLDER_IS_AWAITING_NAME,
		path: path
	}
}

export function createUnsavedFile(path: string): any {
	return {
		type: CREATE_UNSAVED_FILE
	}
}

/**
 * fetch file is a thunk to grab file from storage
 * @param projectId - storage Project ID
 * @param path - path relative to project folder on storage
 * @param fileName - filename relative to file path
 * @param isBlueprint - is blueprint switches folder between "apps" and "blueprints" on storage. We have split projects into two categories and folders: apps and blueprints. A blueprint is the playbook stuff, and app is built from the playbook
 * @returns {Promise<Dispatch>}
 */
export function fetchFile(projectId: string, path: string, fileName: string, isBlueprint: boolean) {

	/**
	 * @method fetchFile
	 * @desc fetch file is a thunk to grab file from storage
	 */
	const args = {
		projectId,
		path,
		fileName,
		isBlueprint,
	};
	/**
	 * @args args
	 */

	return async (dispatch: any): Promise<IMicroserviceStorageFileDetail | undefined> => {
		/**
		 * @step fetch file is a thunk to grab file from storage
		 */
		/**
		 * @dispatch fetchFilePending(path, fileName, isBlueprint)
		 */
		dispatch(fetchFilePending(path, fileName, isBlueprint));

		/**
		 * @try fetch the file
		 */
		try {
			/**
			 * @goto FileStorageService.apiGetFile
			 */
			const resultJson = await FileStorageService.apiGetFile(projectId, path, fileName);
			const fileData: IMicroserviceStorageFileDetail = resultJson.data;
			/**
			 * @data fileData
			 */

			/**
			 * @step Now that we have the file data we can set the state of the file retrieval 
			 */
			/**
			 * @dispatch fetchFileSucess
			 */
			dispatch(fetchFileSuccess(path, fileName, isBlueprint, fileData));

			/**
			 * @returns fileData
			 */
			return fileData;
		}
		catch (err) {
			/**
			 * @error err
			 */
			/**
			 * @dispatch fetchFileError
			 */
			dispatch(fetchFileError(path, fileName, isBlueprint, err));
			/**
			 * @throws err
			 */
			throw err;
		}
	}
}

/**
 * post git checkout
 * @param projectId - project ID
 * @param path - file path to bucket
 * @param branch - branch to checkout
 * @returns {Promise<IMicroserviceStorageGitCheckout>}
 */
export async function postGitCheckout(
	projectId: string, 
	path: string, 
	branch: string
): Promise<IMicroserviceStorageGitCheckout | any> {

	console.log('\n[📦 FileStorage.postGitCheckout] @args ', {
		projectId,
		path,
		branch,
	});

	try {
		let url: string = CONFIG.MICROSERVICE_STORAGE_URL + "bucket";
		if (projectId != null) {
			url += "/project/" + projectId;
		}
		url += "/git/checkout";

		console.log('\n[📦 FileStorage.postGitCheckout] @data ', { url });

		const bodyJson = {
			branch: branch,
			folderPath: path
		}
		const fetchOptions = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyJson)
		}
		const result = await fetch(url, fetchOptions);
		const resultJson: IMicroserviceStorageSuccess = await result.json();

		if (resultJson.err) {
			console.error('\n[📦 FileStorage.postGitCheckout] @error', {
				'resultJson.err': resultJson.err,
			});
			throw resultJson.err;
		}
		else {
			const checkoutData: IMicroserviceStorageGitCheckout = resultJson.data;

			console.log('\n[📦 FileStorage.postGitCheckout] @data checkoutData', {
				checkoutData
			});

			return checkoutData;
		}
	}
	catch (err) {
		console.error('\n[📦 FileStorage.postGitCheckout] @error', {
			err,
		});
		throw err;
	}
}

/**
 * @see fetchFileTree - called by fetchFileTree 
 * Build the root folder for the tree view
 * @param projectId 
 * @param isBlueprint 
 * @param path 
 * @param flatFileData 
 * @param isStarterKit 
 * @returns 
 */
export async function buildRootFolder(
	projectId: string | null,
	isBlueprint: boolean,
	path: string,
	flatFileData: IMicroserviceStorageFile[],
	isStarterKit: boolean = false
): Promise<IFileStorageFile> {

	console.group('\n[FileStorageService.buildRootFolder] @args', {
		projectId,
		isBlueprint,
		path,
		flatFileData,
		isStarterKit,
	});

	try {
		const pathSplit: string[] = path.split('/');

		if (pathSplit.length < 3) {
			throw {
				msg: 'TODO: Your path has invalid nesting!',
			}
		}

		const rootPath: string = '/' + (pathSplit.splice(0, 3)).join('/');
		const rootName: string = pathSplit.length > 1 ? pathSplit.join('/') : pathSplit[0];

		console.log('\n[FileStorageActions.buildRootFolder] @data path: ', path);
		console.log('\n[FileStorageActions.buildRootFolder] @data pathSplit: ', pathSplit);
		console.log('\n[FileStorageActions.buildRootFolder] @data rootPath: ', rootPath);
		console.log('\n[FileStorageActions.buildRootFolder] @data rootName: ', rootName);

		const treeDataStructured: IFileStorageFile = {
			id: rootPath + '/' + rootName,
			projectId: projectId,
			path: rootPath,
			name: rootName,
			fetchComplete: false,
			isFolder: true,
			children: [],
			editing: false,
			errors: {},
			dataPending: {},
			isSaved: true,
			isAwaitingName: false,
			isStarterKit: isStarterKit,
		};
		console.log('\n[FileStorageActions.buildRootFolder] @data treeDataStructured: ', { treeDataStructured });

		if (flatFileData) {
			let foldersAndFilesByTempId: any = {};

			for (let i = 0; i < flatFileData.length; i++) {
				const fileOrFolderData: IMicroserviceStorageFile = flatFileData[i];
				const fileOrFolderJson: IFileStorageFile = {
					id: fileOrFolderData.path + '/' + fileOrFolderData.name,
					projectId: projectId,
					path: fileOrFolderData.path,
					name: fileOrFolderData.name,
					fetchComplete: false,
					isFolder: fileOrFolderData.is_directory,
					fileType: fileOrFolderData.file_type,
					sizeOf: fileOrFolderData.size_of,
					loading: false,
					editing: false,
					errors: {},
					dataPending: {},
					isSaved: true,
					isAwaitingName: false,
					isStarterKit: isStarterKit
				};
				if (fileOrFolderJson.isFolder) {
					fileOrFolderJson.children = [];
				}

				// -- Add ourselves by a _id to the temp obj. We will use this to manage children
				foldersAndFilesByTempId[fileOrFolderData._id] = fileOrFolderJson;

				let parentFolder: IFileStorageFile;
				if (fileOrFolderData._parentId === 0) {
					// -- This is a folder or file that follows right after the root so lets add it straight to the root
					parentFolder = treeDataStructured;
				}
				else {
					// -- This folder or file is a child of a different folder
					if (fileOrFolderData._parentId && foldersAndFilesByTempId[fileOrFolderData._parentId]) {
						parentFolder = foldersAndFilesByTempId[fileOrFolderData._parentId];
					}
					else {
						throw {
							msg: 'TODO : Unable to find the parent folder for the file/folder id: ' + fileOrFolderJson.id
						}
					}
				}

				if (parentFolder) {
					if (!parentFolder.children) {
						parentFolder.children = [];
					}
					parentFolder.children.push(foldersAndFilesByTempId[fileOrFolderData._id]);
				}
			}
		}
		console.log('[FileStorageActions.buildRootFolder] @returns treeDataStructured', treeDataStructured);
		console.groupEnd();
		return treeDataStructured;
	}
	catch (err) {
		console.error('[FileStorageActions.buildRootFolder] @error ', { err });
		console.groupEnd();
		throw err;
	}
}

/**
 * 
 * @param isBlueprint - is blueprint
 * @param fileStorageEntry - file storage entry
 * @param nodeSelected - node selected
 * @param toggleParentFolders - toggle parent folders
 * @param forceSwitchToAppOrBlueprintFolderTree - force switch to app or blueprint folder tree
 * @returns { type, isBlueprint, fileStorageEntry, nodeSelected, forceSwitchToAppOrBlueprintFolderTree }
 */
export function setSelectedFileTreeNode(
	isBlueprint: boolean,
	fileStorageEntry: IFileStorageEntry,
	nodeSelected: IFileStorageFile | null,
	toggleParentFolders: boolean = false,
	forceSwitchToAppOrBlueprintFolderTree: boolean = false
): ISetSelectedFileTreeNodeAction {
	// -- First set active = false to the current active node
	if (fileStorageEntry.nodeSelected) {
		fileStorageEntry.nodeSelected.active = false;
	}
	// ***** FIX ME!!!!! NULL NODE SELECTED
	// -- The node selected may be null. This would mean there is nothing selected
	if (nodeSelected) {
		// -- Set the new node selected as active
		nodeSelected.active = true;
	}
	else {
		// -- A node is required. Lets default to the root node
		nodeSelected = fileStorageEntry.rootFolder || null;
	}


	// -- Before we return the root folder for saving, lets toggle all the folders that lead to the node selected
	if (nodeSelected && toggleParentFolders) {
		let pathSplit: string[] = nodeSelected.path.split('/');
		if (pathSplit[0] == "") {
			pathSplit.shift();
		}

		if (pathSplit.length >= FOLDER_NESTING_LEVEL) {
			let nextFolder: IFileStorageFile | undefined = fileStorageEntry.rootFolder;

			for (var i = FOLDER_NESTING_LEVEL; i < pathSplit.length; i++) {
				if (nextFolder) {
					nextFolder.toggled = true;
					if (nextFolder.children) {
						nextFolder = nextFolder.children.find((child: IFileStorageFile) => {
							return child.name === pathSplit[i];
						})
					}
					else {
						break;
					}
				}
				else {
					break;
				}
			}
			if (nextFolder) {
				nextFolder.toggled = true;
			}
		}
	}

	// -- Finally set the node selected
	// fileStorageEntry.nodeSelected = nodeSelected;

	// -- Once the old node selected has been adjusted, create a new fileStorageEntry root folder
	// let rootFolder: IFileStorageFile = { ...fileStorageEntry.rootFolder }

	return {
		type: SET_SELECTED_FILE_TREE_NODE,
		isBlueprint: isBlueprint,
		fileStorageEntry: fileStorageEntry,
		nodeSelected: nodeSelected,
		forceSwitchToAppOrBlueprintFolderTree: forceSwitchToAppOrBlueprintFolderTree,
	}
}

/**
 * Set file in edit mode
 * @param id 
 * @param editing 
 * @param isBlueprint 
 * @returns 
 */
export function setFileInEdit(
	id: string,
	editing: boolean,
	isBlueprint: boolean
): ISetFileInEditAction {
	console.log("[FileStorageActions.setFileInEdit] @args", {
		id,
		editing,
		isBlueprint,
	});
	let fileStorage: IFileStorageStore = store.getState().fileStorage;
	// -- First we need to find the file with the id in the fileStorage
	let fileOrFolderToUpdate: IFileStorageFile | null = FileStorageService.findById(fileStorage, id, isBlueprint);

	if (fileOrFolderToUpdate) {
		fileOrFolderToUpdate.editing = editing;
	}

	return {
		type: SET_FILE_IN_EDIT,
		isBlueprint: isBlueprint,
		rootFolder: isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder
	}
}

/**
 * 
 * @param isBlueprint - is this a blueprint
 * @param filePath - file path
 * @param fileName - file name
 * @param content - file contents
 * @returns {ISetFileContentAction} action
 */
export function setFileContent(
	isBlueprint: boolean,
	filePath: string,
	fileName: string,
	content: string
): ISetFileContentAction {

	console.group('\n[FileStorageService.setFileContent] @args', {
		isBlueprint,
		filePath,
		fileName,
		content,
	});

	let fileStorage: IFileStorageStore = store.getState().fileStorage;
	let outputFile = FileStorageService.findByRelativePathAndName(fileStorage, isBlueprint ? "blueprint" : "app", filePath, fileName);

	console.log('\n[FileStorageService.setFileContent] @data fileStorage and outputFile', {
		fileStorage,
		outputFile,
	});

	if (outputFile) {
		outputFile.content = content;

		console.log('\n[FileStorageService.setFileContent] @data outputFile.content', {
			'outputFile.content': outputFile.content,
		});
	}

	let action;
	if ((isBlueprint && fileStorage.blueprint.rootFolder) || (!isBlueprint && fileStorage.app.rootFolder)) {
		console.log('\n[FileStorageService.setFileContent] @if ((isBlueprint && fileStorage.blueprint.rootFolder) || (!isBlueprint && fileStorage.app.rootFolder))');
		action = {
			type: SET_FILE_CONTENT,
			isBlueprint: isBlueprint,
			rootFolder: isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder
		}
	}
	else {
		console.log('\n[FileStorageService.setFileContent] @else NOT isBlueprint && fileStorage.blueprint.rootFolder OR isApp && fileStorage.app.rootFolder');
		action = {
			type: SET_FILE_CONTENT,
			isBlueprint: isBlueprint,
			rootFolder: null
		}
	}
	console.log('\n[FileStorageService.setFileContent] @data action', {
		action
	});
	console.groupEnd();
	return action;
}

/**
 * @see actions.REFACTORME.selectStep 
 * @desc dispatches an action to update the handlebars compiled data for a file from storage
 * @param dispatch 
 * @param isBlueprint 
 * @param filePath 
 * @param fileName 
 * @param compiledContent 
 * @param compiledContentMetaData 
 * @returns 
 */
export function setFileCompiledContent(
	dispatch: any,
	isBlueprint: boolean,
	filePath: string,
	fileName: string,
	compiledContent: string,
	compiledContentMetaData: {
		categoryId: string,
		sceneId: string,
		stepId: string,
	}
): ISetFileCompiledContentAction {

	console.group('\n[FileStorageService.setFileCompiledContent] @args', {
		isBlueprint,
		filePath,
		fileName,
		compiledContent,
		compiledContentMetaData,
	});

	let fileStorage: IFileStorageStore = store.getState().fileStorage;
	var outputFile: IFileStorageFile = FileStorageService.findByRelativePathAndName(
		fileStorage,
		isBlueprint ? "blueprint" : "app",
		filePath,
		fileName
	);
	let rootFolderToModify: IFileStorageFile = isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder;

	console.log('\n[FileStorageService.setFileCompiledContent] @data fileStorage', { fileStorage });
	console.log('\n[FileStorageService.setFileCompiledContent] @data outputFile', { outputFile });
	console.log('\n[FileStorageService.setFileCompiledContent] @data rootFolderToModify', { rootFolderToModify });

	if (outputFile) {
		// -- An output file was found, lets save the compiled content to the compiledContent propert of the file
		console.log('\n[FileStorageService.setFileCompiledContent] @step An output file was found, lets save the compiled content to the compiledContent propert of the file.', { compiledContent, compiledContentMetaData });
		outputFile.compiledContent = compiledContent;
		outputFile.compiledContentMetadata = compiledContentMetaData;
	}
	else {
		/** 
		 * @desc 
		 * 		The file could not be found at the given filePath. 
		 * 		We will need to check if the filepath even exists and generate an unsaved  path and file
		 */
		if (filePath.length > 0 && filePath[0] != "/") {
			filePath = "/" + filePath;
		}
		rootFolderToModify = FileStorageService.createUnsavedPathAndFile(
			rootFolderToModify,
			rootFolderToModify.id + filePath, fileName,
			"",
			compiledContent,
			compiledContentMetaData
		);
		console.log('\n[FileStorageService.setFileCompiledContent] The file could not be found at the given filePath.', { rootFolderToModify });
	}

	/**
	 * @returns prepare action for return
	 */
	let action: ISetFileCompiledContentAction;
	if (rootFolderToModify) {
		action = {
			type: SET_FILE_COMPILED_CONTENT,
			isBlueprint: isBlueprint,
			rootFolder: rootFolderToModify,
		}
	}
	else {
		action = {
			type: SET_FILE_COMPILED_CONTENT,
			isBlueprint: isBlueprint,
			rootFolder: null,
		}
	}

	console.log('[FileStorageService.setFileCompiledContent] action', { action, rootFolderToModify });
	console.groupEnd();
	return action;
}

/**
 * Git checkout and build root folder 
 * @param dispatch 
 * @param projectId 
 * @param path 
 * @param branch 
 * @returns 
 */
export async function gitCheckoutAndBuildRootFolder(
	dispatch: any,
	projectId: string | null,
	path: string,
	branch: string
): Promise<IFileStorageFile | null> {
	let structuredRootFolder: IFileStorageFile | null;

	try {
		const checkoutData: IMicroserviceStorageGitCheckout = await postGitCheckout(projectId, path, branch);

		if (checkoutData && checkoutData.branchChanged && checkoutData.files) {
			// -- There was a change in the branch so lets update the file storage app root folder
			let structuredRootFolder: IFileStorageFile = await buildRootFolder(projectId, false, path, checkoutData.files);

			structuredRootFolder.active = true;
			structuredRootFolder.toggled = true;
			dispatch(fetchFileTreeSuccess(false, structuredRootFolder));
		}
	}
	catch (err) {
		console.error("[FileStorageActions.gitCheckoutAndBuildRootFolder] 🦄  gitCheckoutAndBuildRootFolder error: ", err);
	}
	finally {
		return structuredRootFolder;
	}
}



/**
 * Attempts to create either a file or folder. This will should persist to ms-storage
 * 
 * This will fail if:
 * - app file storage => The root file has isStarterKit === true
 *
 * @export
 * @param {string} id
 * @param {string} name
 * @param {boolean} isBlueprint
 * @returns {*}
 */
export function createFileOrFolder(id: string, name: string, isBlueprint: boolean): any {
	return async (dispatch: any) => {

		console.group('\n[FileStorageService.setFileCompiledContent] @args', {
			id,
			name,
			isBlueprint,
		});

		let fileStorage: IFileStorageStore = store.getState().fileStorage;
		let rootFolder: IFileStorageFile = isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder;

		if (rootFolder) {
			// -- Find the temporary file/folder entry that we will create
			let fileOrFolderToCreate: IFileStorageFile = FileStorageService.findById(fileStorage, id, isBlueprint);

			// -- Only continue if this file or folder has not been saved
			if (!fileOrFolderToCreate.isSaved) {
				// -- If it is found and is not saved then we can validate the name
				try {
					await validateFileName(id, name, isBlueprint, fileStorage)(dispatch);

					// -- Dispatch creation pending
					fileOrFolderToCreate.editing = false;
					dispatch(setRootFolderAction(isBlueprint, rootFolder));

					// -- Now save the file/folder
					try {
						let createResult;
						if (fileOrFolderToCreate.isFolder) {
							createResult = await FileStorageService.apiCreateFolder(fileOrFolderToCreate.path, name);
						}
						else {
							createResult = await FileStorageService.apiCreateFile(fileOrFolderToCreate.path, name);
						}

						fileOrFolderToCreate.name = createResult.data.name;
						fileOrFolderToCreate.id = fileOrFolderToCreate.path + "/" + fileOrFolderToCreate.name;
						fileOrFolderToCreate.isSaved = true;
						fileOrFolderToCreate.isAwaitingName = false;
						dispatch(setRootFolderAction(isBlueprint, rootFolder));
					}
					catch (createErr) {
						// -- Error with api update. Dispatch an api error and remove the pending name
						// fileOrFolderToCreate.dataPending.name = null;

						if (createErr.error && createErr.error.msg) {
							fileOrFolderToCreate.errors.name = createErr.error.msg;
						}
						else {
							console.log(" 🦄  Gotta create some consistent error types", createErr)
						}

						dispatch(setRootFolderAction(isBlueprint, rootFolder));
					}

				}
				catch (validationErr) {
					console.error("[FileStorageActions.createFileOrFolder] @error validation error: ", { validationErr });
					throw validationErr;
				}
			}
			else {
				console.error("[FileStorageActions.createFileOrFolder] @error 🦄  Unable to find the file or folder with id: ", id);
			}
		}
		else {
			console.error("[FileStorageActions.createFileOrFolder] @error 🦄  There is no root folder for :", (isBlueprint ? "blueprint" : "app"));
		}

		console.groupEnd();
	}
}


export function saveFileName(id: string, newFileName: string, isBlueprint: boolean): any {
	return async (dispatch: any) => {

		// -- First we need to fetch the file from fileStorage
		let fileStorage: IFileStorageStore = store.getState().fileStorage;
		let rootFolder: IFileStorageFile = isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder;

		if (rootFolder) {
			let fileToUpdate: IFileStorageFile | null = FileStorageService.findById(fileStorage, id, isBlueprint);

			if (fileToUpdate) {
				// -- We will now need to validate the new name
				try {
					// -- Check if the newFileName differs to the old file name
					if (newFileName != fileToUpdate.name) {

						await validateFileName(id, newFileName, isBlueprint)(dispatch);

						// -- Now that validation is complete, dispatch pending
						fileToUpdate.editing = false;
						fileToUpdate.dataPending.name = newFileName;
						dispatch(saveFileNamePending(isBlueprint, rootFolder));

						// -- Validation should be successful if we are here. We will now need to fire a socket and api call

						try {
							// -- Make an api call
							if (fileToUpdate.isFolder) {
								if (folderWatcherSocket) {
									folderWatcherSocket.emit('renameDirFromClient', 1, fileToUpdate.path, fileToUpdate.name, newFileName);
								}

								const updateResult = await FileStorageService.apiUpdateFolderName(null, fileToUpdate.path, fileToUpdate.name, newFileName);

								// -- Set success
								fileToUpdate.name = updateResult.data.name;
								fileToUpdate.id = fileToUpdate.path + "/" + fileToUpdate.name;
								fileToUpdate.dataPending.name = null;

								// -- Because we have updated the name then we will also need to update the paths/ids of the children from this folder
								fileToUpdate = FileStorageService.refreshChildIdsAndPaths(fileToUpdate);

								// -- Now save to the redux
								dispatch(saveFileNameSuccess(isBlueprint, rootFolder));
							}
							else {
								if (folderWatcherSocket) {
									folderWatcherSocket.emit('renameFileFromClient', 1, fileToUpdate.path, fileToUpdate.name, newFileName);
								}
								const updateResult = await FileStorageService.apiUpdateFileName(null, fileToUpdate.path, fileToUpdate.name, newFileName);

								fileToUpdate.name = updateResult.data.name;
								fileToUpdate.id = fileToUpdate.path + "/" + fileToUpdate.name;
								fileToUpdate.fileType = updateResult.data.file_type;
								fileToUpdate.dataPending.name = null;

								dispatch(saveFileNameSuccess(isBlueprint, rootFolder));
							}
						}
						catch (updateErr) {
							// -- Error with api update. Dispatch an api error and remove the pending name
							fileToUpdate.dataPending.name = null;

							if (updateErr.error && updateErr.error.msg) {
								fileToUpdate.errors.name = updateErr.error.msg;
							}
							else {
								console.log(" 🦄  Gotta create some consistent error types", updateErr)
							}

							dispatch(saveFileNameError(isBlueprint, rootFolder));
						}
					}
					else {
						// -- The file name hasnt changed!
						fileToUpdate.editing = false;
						dispatch(setRootFolderAction(isBlueprint, rootFolder));
					}

				}
				catch (err) {
					// -- Error with validation. dispatch is handled in the validation method
					throw err;
				}
			}
			else {
				console.log(" 🦄  Unable to find the file or folder with id: ", id);
			}
		}
		else {
			console.log(" 🦄  There is no root folder for :", (isBlueprint ? "blueprint" : "app"));
		}
	}
}

export function saveFileNamePending(isBlueprint: boolean, rootFolder: IFileStorageFile) {
	return {
		type: SAVE_FILE_NAME_PENDING,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function saveFileNameError(isBlueprint: boolean, rootFolder: IFileStorageFile) {
	return {
		type: SAVE_FILE_NAME_ERROR,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function saveFileNameSuccess(isBlueprint: boolean, rootFolder: IFileStorageFile) {
	return {
		type: SAVE_FILE_NAME_SUCCESS,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function saveFileContents(id: string, content: string, isBlueprint: boolean) {

	console.log('[FileStorageActions.saveFileContents] @args 🐼 🐸 on save Monaco Editor --> action:saveFileContents', { id, content, isBlueprint })

	return async (dispatch: any): Promise<IFileStorageFile | any> => {

		// -- Fetch the file from fileStorage
		let fileStorage: IFileStorageStore = store.getState().fileStorage;
		let rootEntry: IFileStorageEntry = isBlueprint ? fileStorage.blueprint : fileStorage.app;
		let rootFolder: IFileStorageFile = rootEntry.rootFolder;

		// -- Only continue with save if the storage that we are writing to is allowed
		if (!rootEntry.doesNotExistInStorage && rootFolder) {
			let fileToUpdate: IFileStorageFile | null = FileStorageService.findById(fileStorage, id, isBlueprint);

			// -- Set the content to the data pending obj so views can show there is data pending for save
			fileToUpdate.dataPending.content = content;
			dispatch(setRootFolderAction(isBlueprint, rootFolder));

			// -- Before we send for an update, check if it exists in the database
			if (!fileToUpdate.isSaved) {
				try {
					// -- We will send a post
					let createResult = await FileStorageService.apiCreateFile(fileToUpdate.path, fileToUpdate.name, content);

					// -- Set success
					fileToUpdate.isSaved = true;
					fileToUpdate.content = fileToUpdate.dataPending.content;
					fileToUpdate.dataPending.content = null;

					// -- Because this file was an unsaved file then our ms-storage will create all folders that lead this file.
					//	  We will then need to update all the parent folders (if there are any) that are set to "unsaved" to be "saved"
					rootFolder = FileStorageService.setIsSavedToAllFilesAndFoldersInPath(rootFolder, fileToUpdate.path);

					dispatch(setRootFolderAction(isBlueprint, rootFolder));

				}
				catch (createErr) {
					// -- Error with api update. Dispatch an api error and remove the pending name
					fileToUpdate.dataPending.content = null;

					if (createErr.error && createErr.error.msg) {
						fileToUpdate.errors.content = createErr.error.msg;
					}
					else {
						console.log(" 🦄  Gotta create some consistent error types", createErr)
					}

					dispatch(setRootFolderAction(isBlueprint, rootFolder));

				}
			}
			else {
				try {
					// -- We will send a put
					let updateResult = await FileStorageService.apiUpdateFile(fileToUpdate.path, fileToUpdate.name, content)

					fileToUpdate.content = fileToUpdate.dataPending.content;
					fileToUpdate.dataPending.content = null;

					dispatch(setRootFolderAction(isBlueprint, rootFolder));

				}
				catch (updateErr) {
					fileToUpdate.dataPending.content = null;

					if (updateErr.error && updateErr.error.msg) {
						fileToUpdate.errors.content = updateErr.error.msg;
					}
					else {
						console.log(" 🦄  Gotta create some consistent error types", updateErr)
					}
					dispatch(setRootFolderAction(isBlueprint, rootFolder));

				}
			}
		}
	}
}


export function deleteFileOrFolder(id: string, isBlueprint: boolean) {
	return async (dispatch: any) => {
		let fileStorage: IFileStorageStore = store.getState().fileStorage;
		let rootFolder: IFileStorageFile = isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder;

		if (rootFolder) {
			// -- Fetch the file or folder we want to delete
			let fileOrFolderToDelete: IFileStorageFile | null = FileStorageService.findById(fileStorage, id, isBlueprint);

			if (fileOrFolderToDelete) {
				// -- Before we send the file off for deletion, check if the file is just temporary
				if (fileOrFolderToDelete.isAwaitingName || !fileOrFolderToDelete.isSaved) {
					// -- The file is temporary! 
					let newRootFolder: IFileStorageFile = FileStorageService.removeFileOrFolderFromRootFolder(rootFolder, fileOrFolderToDelete.path, fileOrFolderToDelete.name);
					dispatch(setRootFolderAction(isBlueprint, newRootFolder));
				}
				else {
					// -- The file needs to be deleted using API
					try {
						if (fileOrFolderToDelete.isFolder) {
							const deleteResult = await FileStorageService.apiDeleteFolder(fileOrFolderToDelete.path, fileOrFolderToDelete.name);

							// -- Remove the folder from the rootFolder
							let newRootFolder = FileStorageService.removeFileOrFolderFromRootFolder(rootFolder, fileOrFolderToDelete.path, fileOrFolderToDelete.name);
							dispatch(setRootFolderAction(isBlueprint, newRootFolder));
						}
						else {
							const deleteResult = await FileStorageService.apiDeleteFile(fileOrFolderToDelete.path, fileOrFolderToDelete.name);

							// -- Remove the file from the rootFolder
							let newRootFolder = FileStorageService.removeFileOrFolderFromRootFolder(rootFolder, fileOrFolderToDelete.path, fileOrFolderToDelete.name);
							dispatch(setRootFolderAction(isBlueprint, newRootFolder));
						}
					}
					catch (deleteErr) {
						// -- Error with api delete. Dispatch an api error
						fileOrFolderToDelete.dataPending.name = null;

						if (deleteErr.error && deleteErr.error.msg) {
							deleteErr.errors.name = deleteErr.error.msg;
						}
						else {
							console.log(" 🦄  Gotta create some consistent error types", deleteErr)
						}

						dispatch(setRootFolderAction(isBlueprint, rootFolder));
					}
				}
			}
		}
	}
}

export function validateFileName(id: string, newFileName: string, isBlueprint: boolean, fileStorage: IFileStorageStore = store.getState().fileStorage): any {
	return async (dispatch: any) => {

		let rootFolder: IFileStorageFile = isBlueprint ? fileStorage.blueprint.rootFolder : fileStorage.app.rootFolder;

		if (rootFolder) {
			// -- First lets find the file/folder we are trying to validate
			let fileToValidate: IFileStorageFile | null = FileStorageService.findById(fileStorage, id, isBlueprint);

			if (fileToValidate) {
				try {
					const isValid = await FileStorageService.validateFileName(fileStorage, fileToValidate, newFileName, isBlueprint);

					if (fileToValidate.errors.name) {
						// -- Clear the error and dispatch
						fileToValidate.errors.name = null;
						dispatch(validateFileNameSuccess(isBlueprint, rootFolder));
					}

					return true;
				}
				catch (err) {
					fileToValidate.errors.name = err;
					dispatch(validateFileNameError(isBlueprint, rootFolder));
					throw "File name is not valid";
				}

			}
			else {
				console.log(" 🦄  Unable to find the file or folder with id: ", id);
				throw "Unable to find the file or folder with id: " + id;
			}
		}
		else {
			console.log(" 🦄  There is no root folder for :", (isBlueprint ? "blueprint" : "app"));
			throw "There is no root folder for :" + (isBlueprint ? "blueprint" : "app");
		}
	}
}

export function validateFileNameSuccess(isBlueprint: boolean, rootFolder: IFileStorageFile) {
	return {
		type: VALIDATE_FILE_NAME_SUCCESS,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

export function validateFileNameError(isBlueprint: boolean, rootFolder: IFileStorageFile) {
	return {
		type: VALIDATE_FILE_NAME_ERROR,
		isBlueprint: isBlueprint,
		rootFolder: rootFolder
	}
}

/**
 * @author Mitchy 
 * 
 * Toggle the file tree to show the App or Blueprint filetree 
 *
 * @export
 * @param {boolean} showBlueprint
 * @returns
 */
export function toggleFiletree(showBlueprint: boolean) {
	return {
		type: TOGGLE_FILETREE,
		showBlueprint: showBlueprint
	}
}