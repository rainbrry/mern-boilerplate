// import { toast } from "react-hot-toast";
// import {
// 	useCreateUserMutation,
// 	useDeleteUserMutation,
// 	useGetUsersQuery,
// 	useShowUserQuery,
// 	useUpdateUserMutation,
// } from "../api/users";

// export const useGetUsers = () => {
// 	const { data: users, isLoading, isError } = useGetUsersQuery();
// 	return { users, isLoading, isError };
// };

// export const useShowUser = (id) => {
// 	const { data: user, isLoading, isError } = useShowUserQuery(id);
// 	return { user, isLoading, isError };
// };

// export const useCreateUser = async (data) => {
// 	const [createUser] = useCreateUserMutation();
// 	await createUser(data)
// 		.unwrap()
// 		.then((res) => {
// 			toast.success("Berhasil menambahkan data");
// 			return res;
// 		})
// 		.catch((err) => {
// 			toast.error("Gagal menambahkan data");
// 		});
// };

// export const useUpdateUser = async (data) => {
// 	await useUpdateUserMutation(data)
// 		.unwrap()
// 		.then((res) => {
// 			toast.success("Berhasil mengubah data");
// 			return res;
// 		})
// 		.catch((err) => {
// 			toast.error("Gagal mengubah data");
// 		});
// };

// export const useDeleteUser = async (id) => {
// 	await useDeleteUserMutation(id)
// 		.unwrap()
// 		.then((res) => {
// 			toast.success("Berhasil menghapus data");
// 			return res;
// 		})
// 		.catch((err) => {
// 			toast.error("Gagal menghapus data");
// 		});
// };
