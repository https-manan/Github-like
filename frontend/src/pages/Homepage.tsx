import Search from "../components/Search";
import SortRepos from "../components/Sortrepo";
import Repos from "../components/Repos";
import ProfileInfo from "../components/Profile";
import Spinner from "../components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
	const [userProfile, setUserProfile] = useState<any>("");
	const [repos, setRepos] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [sortRepo, setSortRepo] = useState<any>('forked');
	const [sortType, setSortType] = useState('')


	const getUserProfileAndRepo = useCallback(async (username = 'https-manan') => {
		setLoading(true);
		try {
			const res = await axios.get(`https://api.github.com/users/${username}`);
			const userProfile = res.data;
			setUserProfile(userProfile);
			const repores = await axios.get(userProfile?.repos_url);
			const repos = repores.data;
			setRepos(repos);
			return { userProfile, repos };
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [])

	useEffect(() => {
		getUserProfileAndRepo();
	}, []);

	type search = {
		e: any;
		username: string
	}
	const onSearch = async ({ e, username }: search) => {
		e.preventDefault();
		setRepos([]);
		setUserProfile('');

		await getUserProfileAndRepo(username);
	}
	function onSort(sortType: string) {
		let sortRepo = [...repos]; 

		if (sortType === 'recent') {
			sortRepo.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		}
		else if (sortType === "stars") {
			sortRepo.sort((a, b) => b.stargazers_count - a.stargazers_count);
		}
		else if (sortType === 'forked') {
			sortRepo.sort((a, b) => b.forks_count - a.forks_count);
		}

		setSortType(sortType);
		setSortRepo(sortRepo);
	}
	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			<SortRepos onSort={onSort} sortType={sortType} />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				<ProfileInfo userProfile={userProfile} />
				<Repos repos={repos} />
				{loading && <Spinner />}
			</div>
		</div>
	);
};

export default Homepage;
