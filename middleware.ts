import {NextResponse, NextRequest} from 'next/server';

export const config = {
    matcher: ['/app/auth/:path*'],
};


export function middleware(req: NextRequest) {
    const sessionBagId = req.cookies.get('sessionBagId');

    if (!sessionBagId) {
        const newSessionBagId = crypto.randomUUID();

        const response = NextResponse.next();
        response.cookies.set('sessionBagId', newSessionBagId);
        return response;
    }

    return NextResponse.next();
}