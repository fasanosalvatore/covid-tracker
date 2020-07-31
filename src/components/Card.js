import React from 'react';
import Skeleton from 'react-loading-skeleton';

function Card({ title, cases, total, casesType, setType }) {
	if (!cases) return <Skeleton width={'100%'} height={150} />;
	return (
		<div
			className={`bg-white overflow-hidden shadow rounded-lg border-t-4 border-transparent ${
				casesType.type === title && 'border-' + casesType.tailwind
			}`}
		>
			<div className="px-4 py-5 sm:p-6">
				<div className="flex items-center">
					<div
						className={`flex-shrink-0 bg-gray-400 ${
							casesType.type === title && 'bg-' + casesType.tailwind
						} rounded-md p-3`}
					>
						<svg
							className="h-6 w-6 text-white"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<div className="ml-5 w-0 flex-1">
						<dl>
							<dt className="text-sm leading-5 font-medium text-gray-500 truncate">
								{title.charAt(0).toUpperCase() + title.slice(1)}
							</dt>
							<dd className="flex items-baseline">
								<div className="text-2xl leading-8 font-semibold text-gray-900">
									{total}
								</div>
								<div className="ml-2 flex items-baseline text-sm leading-5 font-semibold text-red-600">
									<svg
										className="self-center flex-shrink-0 h-5 w-5 text-red-500"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
									<span className="sr-only">Increased by</span>
									{cases}
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<button
				className="bg-gray-50 px-4 py-4 sm:px-6 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150 w-full text-left"
				onClick={() => setType(title)}
			>
				{casesType.type === title ? "You're viewing this data" : 'View data'}
			</button>
		</div>
	);
}

export default Card;
