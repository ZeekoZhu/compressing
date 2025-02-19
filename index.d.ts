import { ReadStream, WriteStream } from 'fs'

type sourceType = string | Buffer | ReadStream

type destType = string | WriteStream

interface streamEntryOpts {
  relativePath?: string
  ignoreBase?: boolean
  size?: number
}

interface streamHeader {
  type: 'file' | 'directory',
  name: string
}

interface streamHeaderWithMode {
  type: 'file' | 'directory',
  name: string
  mode: number
}

export namespace gzip {

  function compressFile(source: sourceType, dest: destType, opts?: any): Promise<void>

  function uncompress(source: sourceType, dest: destType, opts?: any): Promise<void>

  export class FileStream extends ReadStream {

    constructor(opts?: {
      zlib?: object,
      source: sourceType
    });

  }

  export class UncompressStream extends WriteStream {

    constructor(opts?: {
      zlib?: object,
      source: sourceType
    });

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'error', listener: (err: Error) => void): this

  }

}

export namespace tar {

  import StreamSizeOptions = tgz.StreamSizeOptions

  function compressFile(source: sourceType, dest: destType, opts?: any): Promise<void>

  function compressDir(source: sourceType, dest: destType, opts?: any): Promise<void>

  function uncompress(source: sourceType, dest: string, opts?: any): Promise<void>

  export class Stream extends ReadStream {

    constructor();

    addEntry(entry: string, opts?: streamEntryOpts): void

    addEntry(entry: Buffer | ReadStream, opts: streamEntryOpts): void
  }

  export class FileStream extends ReadStream {

    constructor(opts?: {
      relativePath?: string,
      source?: sourceType
    } & StreamSizeOptions);

  }

  export class UncompressStream extends WriteStream {

    constructor(opts?: {
      source: sourceType
    });

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'entry', listener: (header: streamHeaderWithMode, stream: WriteStream, next: () => void) => void): this
    on(event: 'finish', listener: () => void): this
    on(event: 'error', listener: (err: Error) => void): this

  }

}

export namespace tgz {

  function compressFile(source: sourceType, dest: destType, opts?: any): Promise<void>

  function compressDir(source: sourceType, dest: destType, opts?: any): Promise<void>

  function uncompress(source: sourceType, dest: string, opts?: any): Promise<void>

  export class Stream extends ReadStream {

    constructor(opts?: StreamSizeOptions);

    addEntry(entry: string, opts?: streamEntryOpts): void

    addEntry(entry: Buffer | ReadStream, opts: streamEntryOpts): void
  }

  export interface StreamSizeOptions {
    suppressSizeWarning?: boolean,
    size?: number,
  }

  export class FileStream extends ReadStream {

    constructor(opts?: {
      relativePath?: string,
      zlib?: object,
      source?: sourceType
    } & StreamSizeOptions);

  }

  export class UncompressStream extends WriteStream {

    constructor(opts?: {
      source?: sourceType,
      strip?: number
    });

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'entry', listener: (header: streamHeaderWithMode, stream: WriteStream, next: () => void) => void): this
    on(event: 'finish', listener: () => void): this
    on(event: 'error', listener: (err: Error) => void): this

  }

}

export namespace zip {

  function compressFile(source: sourceType, dest: destType, opts?: any): Promise<void>

  function compressDir(source: sourceType, dest: destType, opts?: any): Promise<void>

  function uncompress(source: sourceType, dest: string, opts?: any): Promise<void>

  export class Stream extends ReadStream {

    constructor();

    addEntry(entry: string, opts?: streamEntryOpts): void

    addEntry(entry: Buffer | ReadStream, opts: streamEntryOpts): void
  }

  export class FileStream extends ReadStream {

    /**
     *  If opts.source is a file path, opts.relativePath is optional, otherwise it's required.
     *
     *  @param opts
     */
    constructor(opts?: {
      relativePath?: string,
      yazl?: object,
      source: string
    } | {
      relativePath: string,
      yazl?: object,
      source?: Buffer | ReadStream
    });

  }

  export class UncompressStream extends WriteStream {

    constructor(opts?: {
      source?: sourceType,
      strip?: number,
      zipFileNameEncoding?: string
    });

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'entry', listener: (header: streamHeaderWithMode, stream: WriteStream, next: () => void) => void): this
    on(event: 'finish', listener: () => void): this
    on(event: 'error', listener: (err: Error) => void): this

  }

}
