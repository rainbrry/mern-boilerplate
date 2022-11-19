import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open }) {
	return (
		<div
			className={`${
				!open ? "w-64" : "w-0"
			} z-30 overflow-y-auto overflow-x-hidden inset-y-0 duration-300 shadow-lg -left-full lg:translate-x-0 lg:static lg:inset-0 h-screen bg-base-100`}
		>
			<div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
				<div className="border-b-2 w-full border-b-teal-400 shadow-sm mb-2">
					<div className="text-base-content text-2xl text-center py-2 font-extrabold">
						Toko Online
					</div>
				</div>

				<ul className="space-y-2">
					<li>
						<NavLink
							to="/"
							end
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
								/>
							</svg>

							<span className="ml-3">Dashboard</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/users"
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								/>
							</svg>

							<span className="ml-3">User</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/products"
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
								/>
							</svg>

							<span className="ml-3">Produk</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/purchasings"
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>

							<span className="ml-3">Pembelian</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/sellings"
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>

							<span className="ml-3">Penjualan</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/reports"
							className="flex items-center p-3 text-base font-normal
							text-base-600 rounded-lg focus:bg-cyan-500 focus:text-white"
							tabIndex={-1}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
								/>
							</svg>

							<span className="ml-3">Laporan</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}
