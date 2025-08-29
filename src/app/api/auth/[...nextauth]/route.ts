import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/prisma';


// NextAuthのJWTにユーザーIDを追加するための型拡張。
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}


/**
 * NextAuthのプロバイダーの型定義。
 */
type ClientType = {
  clientId: string;
  clientSecret: string;
};


/**
 * NextAuthのオプション。
 */
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7日間（秒単位）
  },
  callbacks: {
    async signIn({ user, account }) {
      // Google SSOでログインしたアカウントが登録されているか検証
      if (account?.provider === 'google' && user.name && user.email && user.image) {
        const registration = await prisma.user.findUnique({
          select: { id: true, name: true, imageHash: true },
          where: { email: user.email }
        });
        if (registration) {
          // TODO: ユーザー情報の更新
          user.id = registration.id;
          return true;
        } else {
          // 登録されていない場合は新規登録
          const row = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              imageHash: null, // TODO: 画像の保存(Vercel Blob)とハッシュ化
            },
            select: { id: true },
          });
          user.id = row.id;
          return true;
        }
      }
      // 許可しない場合はfalse
      return false;
    },
    async jwt({ token, user }) {
      token.id = user.id;
      return token;
    }
  },
};


/**
 * NextAuthのリクエストハンドラー。
 */
const handler = NextAuth(authOptions);


/**
 * GETおよびPOSTリクエストをNextAuthのリクエストハンドラーで処理する。
 */
export { handler as GET, handler as POST };
