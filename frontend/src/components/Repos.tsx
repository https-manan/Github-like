import Repo from "./Repo";


const Repos = ({ repos }: any) => {
	return (
		<div className={`lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6`}>
			<ol className='relative border-s border-gray-200'>
				{repos.map((rep: any) => (
					<Repo key={rep.id} repo={rep} />
				))}
			</ol>
		</div>
	);
};

export default Repos