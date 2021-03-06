// Type definitions for progress.js v4.0
//
// Author(s): egarcia
//

export module progress {
	export module data {
		export class Session {
			constructor(options?: SessionOptions);
			static AUTH_TYPE_ANON : string;
			static AUTH_TYPE_BASIC : string;
			static AUTH_TYPE_FORM : string;
			login(serviceURI: string, username: string, password: string): void;
			addCatalog(catalogURI: string): void;
			subscribe(eventName: string, callback: Function, scope?: any): void;
			unsubscribe(eventName: string, callback: Function, scope?: any): void;
			unsubscribeAll(eventName: string): void;
		}

		export class JSDOSession {
			constructor(options: JSDOSessionOptions);
			login(username: string, password: string): JQueryPromise;
			logout(): JQueryPromise
			addCatalog(catalogURI: string): JQueryPromise;
			subscribe(eventName: string, callback: Function, scope?: any): void;
			unsubscribe(eventName: string, callback: Function, scope?: any): void;
			unsubscribeAll(eventName: string): void;
			isAuthorized(): JQueryPromise;
			disconnect(): JQueryPromise;
		}

		export function getSession(options?: JSDOSessionOptions): JQueryPromise;

		interface SessionOptions {
		}

		interface JSDOSessionOptions {
			serviceURI: string;
			catalogURIs?: string;		
			authenticationModel?: string;
			authProvider?: progress.data.AuthenticationProvider		
		}

		interface JSDOOptions {
			name?: string;
			tableRef?: string;
		}

		interface FilterOptions {
			filter?: any;
			id?: any;
			skip?: any;
			sort?: any;
			top?: any;
		}

		interface CRUDCallback {
			(jsdo: JSDO, success: boolean, request: any): void;
		}

		interface JQueryPromise {
			done(any?: any, errCb? : any): any;
			fail(any?: any);
			then(any?: any);
			catch(any?: any);
		}

		export class JSDO implements IJSTableRef, IJSRecord, ISubscribe {
			public static MODE_APPEND: number;
			public static MODE_MERGE: number;
			public static MODE_REPLACE: number;
			public static MODE_EMPTY: number;
			public static ALL_DATA: number;
			public static CHANGES_ONLY: number;

			constructor(resourceName: string);
			constructor(options: JSDOOptions);

			autoApplyChanges: boolean;
			autoSort: boolean;
			caseSensitive: boolean;
			name: string;
			useRelationships: boolean;

			addLocalRecords(addMode: number, keyFields?: any): boolean;
			addLocalRecords(storageName: string, addMode: number, keyFields?: any): boolean;
			deleteLocal(storageName?: string): void;;
			fill(filter?: string): JQueryPromise;
			fill(options: FilterOptions): JQueryPromise;
			hasChanges(): boolean;
			invoke(methodName: string, object: any): JQueryPromise;
			readLocal(storageName?: string): boolean;
			saveChanges(useSubmit?: boolean): void;
			saveLocal(dataMode?: number): void;
			saveLocal(storageName: string, dataMode: number): void;
			count(query : any) : void;

			// IJSTableRef
			record: JSRecord;
			acceptChanges(): boolean;
			rejectChanges(): boolean;
			add(object: any): boolean;
			addRecords(mergeObject: any, addMode: number, keyFields?: any): void;
			find(code: Function): JSRecord;
			findById(id: string): JSRecord;
			foreach(code: Function): void;
			getData(): any[];
			getSchema(): any[];
			hasData(): boolean;
			setSortFields(sortFields: string[]): void;
			setSortFn(funcRef: Function): void;
			sort(sortFields: string[]): void;
			sort(funcRef: Function): void;
			viewTables: string;
			// IJSRecord
			acceptRowChanges(): boolean;
			assign(object: any): boolean;
			getErrorString(): string;
			getId(): string;
			rejectRowChanges(): boolean;
			remove(): boolean;

			// ISubscribe
			subscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			subscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;

			unsubscribeAll(eventName: string): void;
		}

		export class JSTableRef implements IJSTableRef, IJSRecord, ISubscribe {
			record: JSRecord;
					
			// IJSTableRef
			acceptChanges(): boolean;
			add(object: any): boolean;
			addRecords(mergeObject: any, addMode: number, keyFields?: any): void;
			find(code: Function): JSRecord;
			findById(id: string): JSRecord;
			foreach(code: Function): void;
			getData(): any[];
			getSchema(): any[];
			hasData(): boolean;
			setSortFields(sortFields: string[]): void;
			setSortFn(funcRef: Function): void;
			sort(sortFields: string[]): void;
			sort(funcRef: Function): void;

			// IJSRecord
			acceptRowChanges(): boolean;
			assign(object: any): boolean;
			getErrorString(): string;
			getId(): string;
			rejectRowChanges(): boolean;
			remove(): boolean;

			// ISubscribe
			subscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			subscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;
		}

		export class JSRecord implements IJSRecord {
			data: any;
			
			// IJSRecord
			acceptRowChanges(): boolean;
			assign(object: any): boolean;
			getErrorString(): string;
			getId(): string;
			rejectRowChanges(): boolean;
			remove(): boolean;
		}

		export class AuthenticationProvider {
			constructor(options: IAuthenticationProviderOptions);

			login(username: string, password: string): JQueryPromise;
			logout(): JQueryPromise;
			hasClientCredentials(): boolean;
		}

		export interface IAuthenticationProviderOptions {
			authenticationModel: string;
			uri: string;
		}

		interface IJSTableRef {		
			acceptChanges(): boolean;
			add(object: any): boolean;
			addRecords(mergeObject: any, addMode: number, keyFields?: any): void;
			find(code: Function): JSRecord;
			findById(id: string): JSRecord;
			foreach(code: Function): void;
			getData(): any[];
			getSchema(): any[];
			hasData(): boolean;
			setSortFields(sortFields: string[]): void;
			setSortFn(funcRef: Function): void;
			sort(sortFields: string[]): void;
			sort(funcRef: Function): void;
		}

		interface IJSRecord {
			acceptRowChanges(): boolean;
			assign(object: any): boolean;
			getErrorString(): string;
			getId(): string;
			rejectRowChanges(): boolean;
			remove(): boolean;
		}

		interface ISubscribe {
			subscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			subscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, callback: CRUDCallback, scope?: any): void;
			unsubscribe(eventName: string, operationName: string, callback: CRUDCallback, scope?: any): void;
		}

	}
}