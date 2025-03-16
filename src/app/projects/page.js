import ProjectCard from "@/components/ProjectCard";

const projects = {
  motorcycle: [
    {
      title: "Ninja 650 Exhaust Upgrade",
      description: "Custom installation of a performance exhaust system on my Kawasaki Ninja 650, enhancing both aesthetics and performance.",
      imageSrc: "/images/motorcycle/PXL_20230713_003145922.jpg",
      imageAlt: "Ninja 650 Exhaust Installation",
      tags: ["Motorcycle", "DIY", "Performance"]
    },
    {
      title: "MSF Course on Harley X350",
      description: "Completed the Motorcycle Safety Foundation course on the Harley Davidson X350, a bike designed for the Chinese market in partnership with QianJiang. This experience provided foundational riding skills and safety knowledge.",
      imageSrc: "/images/motorcycle/PXL_20230427_234453049.jpg",
      imageAlt: "Harley Davidson X350 MSF Course",
      tags: ["Motorcycle", "Training", "Safety", "Harley Davidson"]
    }
  ]
};

export default function Projects() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Projects</h1>
          <p className="text-foreground/70 mb-12">
            A showcase of my hands-on motorcycle projects and modifications.
          </p>

          {/* Motorcycle Projects */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-geist-mono)]">Motorcycle Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.motorcycle.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 