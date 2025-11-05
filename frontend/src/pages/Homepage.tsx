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
const [sortRepo, setSortRepo] = useState('forked');


const getUserProfileAndRepo = useCallback(async ()=>{
	setLoading(true);
	try {
		const res = await axios.get(`https://api.github.com/users/https-manan`);
		const userProfile = res.data;
		setUserProfile(userProfile);
		const repores = await axios.get(userProfile?.repos_url);
		const repos = repores.data;
		setRepos(repos);
	} catch (error) {
		console.log(error);
	} finally {
		setLoading(false);
	}
},[])

useEffect(() => {
	getUserProfileAndRepo();
}, []);

return (
	<div className='m-4'>
		<Search />
		<SortRepos />
		<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
			<ProfileInfo userProfile={userProfile}/>
			<Repos />
			<Spinner />
		</div>
	</div>
);
};

export default Homepage;
