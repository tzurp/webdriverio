import type { ReportOptions } from 'istanbul-reports'
import type { Totals, CoverageSummaryData } from 'istanbul-lib-coverage'
import type { Viewport } from 'puppeteer-core/lib/cjs/puppeteer/common/PuppeteerViewport'
import type { NETWORK_STATES, PWA_AUDITS } from './constants'

export interface DevtoolsConfig {
    coverageReporter?: CoverageReporterOptions
}

export interface CoverageReporterOptions {
    /**
     * whether or not to enable code coverage reporting
     * @default false
     */
    enable?: boolean
    /**
     * Directory where JS coverage reports are stored
     */
    logDir?: string
    /**
     * format of report
     * @default json
     */
    type?: keyof ReportOptions
    /**
     * Options for coverage report
     */
    options?: any
}

export type FormFactor = 'mobile' | 'desktop' | 'none'

export interface EnablePerformanceAuditsOptions {
    cacheEnabled: boolean
    cpuThrottling: number
    networkThrottling: keyof typeof NETWORK_STATES
    formFactor: FormFactor
}

export interface DeviceDescription {
    viewport: Viewport;
    userAgent: string;
}

export interface Device {
    name: string;
    userAgent: string;
    viewport: {
        width: number;
        height: number;
        deviceScaleFactor: number;
        isMobile: boolean;
        hasTouch: boolean;
        isLandscape: boolean;
    };
}

export interface Audit {
    audit: (opts: any, context: any) => Promise<any>,
    defaultOptions: Record<string, any>
}

export interface AuditResults {
    'speed-index': MetricsResult
    'first-contentful-paint': MetricsResult
    'largest-contentful-paint': MetricsResult
    'cumulative-layout-shift': MetricsResult
    'total-blocking-time': MetricsResult
    interactive: MetricsResult
}

export interface AuditRef {
    id: keyof AuditResults
    weight: number
}

export interface MainThreadWorkBreakdownResult {
    details: {
        items: {
            group: string,
            duration: number
        }[]
    }
}

export interface DiagnosticsResults {
    details: {
        items: any[]
    }
}

export interface ResponseTimeResult {
    numericValue: number
}

export interface MetricsResult {
    score: number
}

export interface MetricsResults {
    details: {
        items: {
            estimatedInputLatency: number
            observedDomContentLoaded: number
            observedFirstVisualChange: number
            observedFirstPaint: number
            firstContentfulPaint: number
            firstMeaningfulPaint: number
            largestContentfulPaint: number
            observedLastVisualChange: number
            firstCPUIdle: number
            interactive: number
            observedLoad: number
            speedIndex: number
            totalBlockingTime: number
        }[]
    }
}

export interface LHAuditResult {
    score: number
    warnings?: any[]
    notApplicable?: boolean
    numericValue?: number
    numericUnit?: string
    displayValue?: {
        i18nId: string
        values: any
        formattedDefault: string
    }
    details?: any
}

export interface AuditResult {
    passed: boolean
    details: Record<string, LHAuditResult | ErrorAudit>
}

export interface ErrorAudit {
    score: 0
    error: Error
}

export type PWAAudits = keyof typeof PWA_AUDITS

export interface Coverage {
    lines: Totals
    statements: Totals
    functions: Totals
    branches: Totals
    files: Record<string, CoverageSummaryData>
}