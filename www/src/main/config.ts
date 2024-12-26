interface BaseConfigOption {
  scheme?: 'http' | 'https';
  tags?: string[];
  title?: string;
  base?: string;
  host?: string;
  port?: number;
}

export class BaseConfig implements BaseConfigOption {
  port: number;
  host: string;
  base: string;
  title: string;
  tags: string[];
  scheme: 'http' | 'https';

  constructor(options?: Partial<BaseConfigOption>) {
    this.tags = (options || {}).tags || [];
    this.port = (options || {}).port || 80;
    this.base = (options || {}).base || '/';
    this.scheme = (options || {}).scheme || 'http';
    this.host = (options || {}).host || 'localhost';
    this.title = (options || {}).title || 'Nest Blog';
  }

  get baseUrl() {
    return [this.scheme, '://', this.host, this.port !== 80 ? `:${this.port}` : '', this.base].join('');
  }

  get url() {
    return [this.baseUrl, '?', 'title=', this.title, '&tags=', this.tags.join(',')].join('');
  }

  set url(url: string) {
    const newUrl = new URL(url);
    this.host = newUrl.hostname;
    this.base = newUrl.pathname;
    this.port = Number(newUrl.port);
    this.tags = newUrl.searchParams.getAll('tag') || [];
    this.title = newUrl.searchParams.get('title') || this.title;
    this.scheme = newUrl.protocol.replace(':', '') as 'http' | 'https';
  }
}
