import Image from "next/image";

export default function Teams() {
  const teams = [
    {
      name: "Philadelphia Eagles",
      league: "NFL",
      logo: "https://static.www.nfl.com/image/private/f_auto/league/puzkqnad9dxafuqo0hob",
      description: "Fly Eagles Fly! Proud supporters of the midnight green since day one.",
      colors: ["#004C54", "#A5ACAF", "#000000"],
      standing: {
        record: "11-6",
        position: "2nd NFC East",
        lastSeason: "Made playoffs, Wild Card elimination"
      }
    },
    {
      name: "Tottenham Hotspur",
      league: "Premier League",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
      description: "COYS! North London's finest, known for daring attacking football.",
      colors: ["#132257", "#FFFFFF"],
      standing: {
        record: "5th Place",
        points: "60 pts",
        recentForm: "WLWLD"
      }
    },
    {
      name: "Cleveland Browns",
      league: "NFL",
      logo: "https://static.www.nfl.com/image/private/f_auto/league/fgbn8acp4opvyxk13dcy",
      description: "Dawg Pound! The heart and soul of Northeast Ohio football.",
      colors: ["#311D00", "#FF3C00", "#FFFFFF"],
      standing: {
        record: "11-6",
        position: "2nd AFC North",
        lastSeason: "Made playoffs, Wild Card elimination"
      }
    },
    {
      name: "Pittsburgh Panthers",
      league: "NCAA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Pittsburgh_Panthers_logo.svg",
      description: "Hail to Pitt! Pride of the Steel City. H2P!",
      colors: ["#003594", "#FFB81C"],
      standing: {
        record: "3-9",
        conference: "2-6 ACC",
        lastSeason: "2023 Season"
      }
    },
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">My Teams</h1>
          <p className="text-foreground/70 mb-12">
            Sports have always been a huge part of my life. Here are the teams I support across different leagues.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team) => (
              <div key={team.name} className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
                <div className="aspect-video relative bg-white">
                  <Image
                    src={team.logo}
                    alt={`${team.name} logo`}
                    fill
                    className="object-contain p-8"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{team.name}</h2>
                    <span className="text-sm text-foreground/70">{team.league}</span>
                  </div>
                  <p className="text-foreground/70 mb-4">{team.description}</p>
                  <div className="bg-foreground/5 rounded-md p-3 mb-4">
                    <h3 className="text-sm font-semibold mb-2">Current Standing</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(team.standing).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-foreground/50 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                          <span className="text-foreground/90">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {team.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #e5e5e5' : 'none' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 