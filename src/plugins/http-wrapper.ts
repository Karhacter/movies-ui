import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type ResponseType,
} from 'axios'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const DEFAULT_REQ_OPTS = {
  headers: {},
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const REQUEST_METHODS: Record<string, RequestMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

const METHODS_ALLOW_PAYLOAD = new Set([
  REQUEST_METHODS.POST,
  REQUEST_METHODS.PUT,
  REQUEST_METHODS.PATCH,
])

interface HttpWrapperOptions {
  baseURL?: string
  responseType?: ResponseType
  headers?: Record<string, string>
}

export class HttpWrapper {
  private $axios: AxiosInstance
  private customHeaders: Record<string, string>

  private errorMessages: Record<number, string> = {
    400: 'Request data went wrong',
    401: 'Endpoint requires authentication',
    403: 'Forbidden endpoint',
    404: 'Endpoint is not found',
    500: 'Something went wrong',
  }

  constructor(options: HttpWrapperOptions = {}) {
    const { baseURL = '/', responseType = 'json', headers = {} } = options
    this.customHeaders = headers
    this.$axios = axios.create({
      baseURL,
      responseType,
      headers: { ...DEFAULT_HEADERS, ...headers },
    })
  }

  removeAccessToken(): void {
    this.$axios.defaults.headers.common = { ...DEFAULT_HEADERS, ...this.customHeaders }
  }

  setAccessToken(token: string, type = 'Bearer '): void {
    this.$axios.defaults.headers.common['Authorization'] = `${type}${token}`
  }

  async get<T>(
    url: string,
    params: Record<string, any> = {},
    options = DEFAULT_REQ_OPTS,
  ): Promise<T> {
    return this.sendRequest<T>(url, REQUEST_METHODS.GET, options, params)
  }

  async post<T>(url: string, data: any = {}, options = DEFAULT_REQ_OPTS): Promise<T> {
    return this.sendRequest<T>(url, REQUEST_METHODS.POST, options, data)
  }

  async put<T>(url: string, data: any = {}, options = DEFAULT_REQ_OPTS): Promise<T> {
    return this.sendRequest<T>(url, REQUEST_METHODS.PUT, options, data)
  }

  async delete<T>(
    url: string,
    params: Record<string, any> = {},
    options = DEFAULT_REQ_OPTS,
  ): Promise<T> {
    return this.sendRequest<T>(url, REQUEST_METHODS.DELETE, options, params)
  }

  async upload<T>(url: string, form: FormData, options = DEFAULT_REQ_OPTS): Promise<T> {
    const headers = {
      ...options.headers,
      'Content-Type': 'multipart/form-data',
    }
    return this.sendRequest<T>(url, REQUEST_METHODS.POST, { ...options, headers }, form)
  }

  private async sendRequest<T>(
    url: string,
    method: RequestMethod,
    options = DEFAULT_REQ_OPTS,
    payload: any = {},
  ): Promise<T> {
    if (!url) {
      throw new Error('URL must be a valid string')
    }

    const { headers } = { ...DEFAULT_REQ_OPTS, ...options }

    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      // Fix: Don't convert params to URLSearchParams for GET requests
      params: !METHODS_ALLOW_PAYLOAD.has(method) ? payload : undefined,
      data: METHODS_ALLOW_PAYLOAD.has(method) ? payload : undefined,
    }

    return this.parseResponse<T>(this.$axios.request<T>(config))
  }

  private async parseResponse<T>(requester: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await requester
      return response.data
    } catch (error: any) {
      const status = error.response?.status || 500
      throw new Error(this.errorMessages[status] || 'Unknown error')
    }
  }
}

export const $http = new HttpWrapper({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: DEFAULT_HEADERS,
})
