const axios = require('axios');

const getUserProfileAndRepo = async (req, res) => {
  const { username } = req.params;
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = userResponse.data;

    const repoResponse = await axios.get(userProfile.repos_url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const repos = repoResponse.data;

    return res.json({ userProfile, repos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
};

module.exports = { getUserProfileAndRepo };

