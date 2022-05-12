import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: "Username", type: "email", placeholder: "username" },
				password: { label: "Password", type: "password", placeholder: "password" }
			},
			authorize: async (credentials) => {
				console.log("authorize", credentials);

				try {
					const res = await axios({
						method: "post",
						url: "http://localhost:3000/api/users/login",
						data: credentials
					});
					const user = await res.data;

					// status 200 => user exists
					if (res.status === 200) {
						return {
							id: user.id,
							name: user.name,
							email: user.username,
							userid: user.userid,
							status: "authorized"
						}
					}

					return {
						id: user.id,
						name: user.name,
						email: user.username,
						userid: user.userid,
						status: "unauthorized"
					};
				} catch (err) {
					console.log("err", err);
					return {
						id: 0,
						name: "",
						email: "",
						userid: "",
						status: "unauthorized"
					};
				}
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.status = user.status;
				token.userid = user.userid;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.id = token.id;
				session.status = token.status;
				session.userid = token.userid;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	pages: {
		signIn: "/auth/login",
	}
});