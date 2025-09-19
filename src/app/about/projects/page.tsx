import Link from "next/link";
import Image from "next/image";

// Projects array with keywords for Unsplash queries
const projects = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "A modern portfolio built with Next.js & Tailwind CSS.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    query: "web design",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description:
      "Data visualization dashboard with interactive charts and reports.",
    tags: ["React", "D3.js", "API"],
    query: "data dashboard",
  },
  {
    id: "ml-models",
    title: "Machine Learning Models",
    description:
      "Implementations of ML algorithms with visualization & deployment.",
    tags: ["Python", "TensorFlow", "Scikit-learn"],
    query: "artificial intelligence",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    description:
      "Responsive e-commerce website with product pages and a shopping cart.",
    tags: ["Next.js", "Stripe", "MongoDB"],
    query: "ecommerce website",
  },
];

// Fetch Unsplash image for a given query
async function getProjectImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Failed to fetch image for:", query);
    return null;
  }
  return res.json();
}

export default async function Projects() {
  // fetch images for each project
  const images = await Promise.all(
    projects.map((p) => getProjectImage(p.query))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white px-8 py-16 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          🚀 My Projects
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          A collection of projects showcasing my skills in{" "}
          <span className="text-indigo-400 font-semibold">Machine Learning</span>{" "}
          and{" "}
          <span className="text-pink-400 font-semibold">Web Development</span>.
        </p>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block rounded-2xl bg-gradient-to-br from-indigo-700/40 to-slate-800/40 shadow-lg hover:scale-105 hover:shadow-2xl hover:from-pink-600/40 hover:to-purple-700/40 transition"
            >
              {/* Project Image */}
              {images[index] && (
                <div className="overflow-hidden rounded-t-2xl">
                  <Image
                    src={images[index].urls.small}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-48 group-hover:scale-110 transition duration-500"
                  />
                </div>
              )}

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-300">
                  {project.title}
                </h3>
                <p className="text-slate-300 mt-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 group-hover:bg-pink-500/20 group-hover:text-pink-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
