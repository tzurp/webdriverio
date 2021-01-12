import { readFile, getPidPath } from './utils'
import { getValue, setValue, setPort } from './client'

import type { JsonCompatible, JsonPrimitive, Services } from '@wdio/types'
import type { Browser } from 'webdriverio'

/**
 * ToDo(Christian): make this public accessible
 */
interface ServiceBrowser extends Browser {
    sharedStore: {
        get: (key: string) => JsonPrimitive | JsonCompatible;
        set: (key: string, value: JsonPrimitive | JsonCompatible) => void;
    }
}

export default class SharedStoreService implements Services.ServiceInstance {
    private _browser?: ServiceBrowser

    async beforeSession () {
        /**
         * get port from parent's pid file saved in `onPrepare` hook
         */
        const port = await readFile(getPidPath(process.ppid))

        setPort(port.toString())
    }

    before (
        caps: unknown,
        specs: unknown,
        browser: ServiceBrowser
    ) {
        this._browser = browser
        const sharedStore = Object.create({}, {
            get: {
                value: (key: string) => this._browser?.call(() => getValue(key))
            },
            set: {
                value: (
                    key: string,
                    value: JsonCompatible | JsonPrimitive
                ) => this._browser?.call(() => setValue(key, value))
            }
        })

        this._browser.sharedStore = sharedStore
    }
}
