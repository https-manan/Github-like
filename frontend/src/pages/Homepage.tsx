import Search from "../components/Search";
import SortRepos from "../components/Sortrepo";
import Repos from "../components/Repos";
import ProfileInfo from "../components/Profile";
import Spinner from "../components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getUserProfileAndRepo = useCallback(async (username: string = "https-manan") => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:5000/api/users/profile/${username}`);
      const { userProfile, repos } = res.data;
      repos.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setUserProfile(userProfile);
      setRepos(repos);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "API Error");
        console.error("API Error:", err.response?.data || err.message);
      } else {
        setError("Failed to fetch user profile.");
        console.error("Failed to fetch user profile:", err);
      }
      setUserProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepo();
  }, [getUserProfileAndRepo]);

  const onSearch = async (e: React.FormEvent, username: string) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      alert("Please enter a username");
      return;
    }

    console.log("[Homepage] onSearch called with:", trimmedUsername);

    setRepos([]);
    setUserProfile(null);
    setError(null);

    await getUserProfileAndRepo(trimmedUsername);
  };

  function onSort(sortType: string) {
    const sortedRepos = [...repos];
    if (sortType === 'recent') {
      sortedRepos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortType === "stars") {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === 'forked') {
      sortedRepos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos(sortedRepos);
  }

  return (
    <div className='m-4'>
      <Search onSearch={onSearch} />
      {userProfile && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {loading && <Spinner />}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && userProfile && <ProfileInfo userProfile={userProfile} />}
        {!loading && repos.length > 0 && <Repos repos={repos} />}
      </div>
    </div>
  );
};

export default Homepage;
