import Project from "../models/Project.js";

export async function getProjects(req, res, next) {
  try {
    const filter = {};
    if (req.query.featured === "true") filter.featured = true;
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
}

export async function importFromGithub(req, res, next) {
  try {
    const user = req.query.user || process.env.GITHUB_USER;
    if (!user) return res.status(400).json({ message: "Missing GitHub username (user)" });

    const token = req.query.token || process.env.GITHUB_TOKEN;
    const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&type=owner&sort=updated`;

    const headers = { Accept: "application/vnd.github.mercy-preview+json" };
    if (token) headers.Authorization = `token ${token}`;

    const resp = await fetch(url, { headers });
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ message: `GitHub fetch failed: ${text}` });
    }

    const repos = await resp.json();
    if (!Array.isArray(repos)) return res.status(500).json({ message: "Unexpected GitHub response" });

    const created = [];
    for (const repo of repos) {
      const tech = [];
      if (repo.language) tech.push(repo.language);
      if (Array.isArray(repo.topics) && repo.topics.length) tech.push(...repo.topics);

      const projectData = {
        title: repo.name,
        description: repo.description || "",
        techStack: Array.from(new Set(tech)),
        imageUrl: (repo.owner && repo.owner.avatar_url) || "",
        githubUrl: repo.html_url || "",
        liveUrl: repo.homepage || "",
        featured: false,
        order: repo.stargazers_count ? -repo.stargazers_count : 0,
      };

      // Upsert by githubUrl when possible
      if (projectData.githubUrl) {
        // eslint-disable-next-line no-await-in-loop
        const doc = await Project.findOneAndUpdate(
          { githubUrl: projectData.githubUrl },
          projectData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        created.push(doc);
      }
    }

    res.json({ imported: created.length, projects: created });
  } catch (err) {
    next(err);
  }
}
