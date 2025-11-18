import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function fakeBackendInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const servers = [
    { id: 's1', name: 'web-01', ip: '10.0.0.11', region: 'eu-west-1' },
    { id: 's2', name: 'db-01', ip: '10.0.0.12', region: 'eu-west-1' },
  ];

  if (req.url.endsWith('/api/servers') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: servers })).pipe(
      delay(120)
    );
  }

  if (req.url.endsWith('/api/reboot/schedule') && req.method === 'POST') {
    const body = req.body || {};
    if (!body.serverId || !body.scheduledAt) {
      return of(
        new HttpResponse({ status: 400, body: { message: 'Invalid payload' } })
      ).pipe(delay(50));
    }
    const resp = { id: 'r-' + Math.random().toString(36).slice(2, 9), ...body };
    return of(new HttpResponse({ status: 201, body: resp })).pipe(delay(200));
  }

  return next(req);
}
