import TeamLogo from "./components/TeamLogo";

export default async function Teams() {
  const teamsByCategory = {
    nfl: [
      {
        name: "Cleveland Browns",
        league: "NFL",
        conference: "AFC North",
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png",
        description: "Here We Go Brownies Here We Go! - Woof! Woof!",
        colors: ["#311D00", "#FF3C00", "#FFFFFF"]
      },
      {
        name: "Philadelphia Eagles",
        league: "NFL",
        conference: "NFC East",
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
        description: "Fly Eagles Fly!",
        colors: ["#004C54", "#A5ACAF", "#000000"]
      }
    ],
    college: [
      {
        name: "Pittsburgh Panthers",
        league: "NCAA",
        conference: "ACC",
        logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/221.png",
        description: "H2P! My alma mater.",
        colors: ["#003594", "#FFB81C"]
      },
      {
        name: "Rutgers Scarlet Knights",
        league: "NCAA",
        conference: "Big Ten",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Rutgers_Scarlet_Knights_logo.svg",
        description: "RUUUUU!",
        colors: ["#CC0033", "#000000"]
      },
      {
        name: "Michigan Wolverines",
        league: "NCAA",
        conference: "Big Ten",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/1200px-Michigan_Wolverines_logo.svg.png",
        description: "Go Blue!",
        colors: ["#00274C", "#FFCB05"]
      }
    ],
    soccer: [
      {
        name: "Tottenham Hotspur",
        league: "Premier League",
        conference: "English Premier League",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
        description: "COYS!",
        colors: ["#132257", "#FFFFFF"]
      },
      {
        name: "Málaga CF",
        league: "Primera Federación",
        conference: "Group 2",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/M%C3%A1laga_CF.svg/1280px-M%C3%A1laga_CF.svg.png?20170118002740",
        description: "¡Vamos Málaga!",
        colors: ["#0091CE", "#FFFFFF"]
      }
    ],
    rugby: [
      {
        name: "Leicester Tigers",
        league: "Premiership Rugby",
        conference: "English Premiership",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Leicester_Tigers_logo.svg/1280px-Leicester_Tigers_logo.svg.png",
        description: "Tigers in the house",
        colors: ["#006F53", "#FFFFFF", "#000000"]
      }
    ]
  };

  const categoryTitles = {
    nfl: "NFL",
    college: "College Football",
    soccer: "Soccer",
    rugby: "Rugby"
  };

  return (
    <div className="container mx-auto">
<section className="pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">My Teams</h1>
          <p className="text-foreground/70 mb-12">
            Sports have always been a huge part of my life, connecting me with family, friends, and amazing memories across the globe.
          </p>

          {Object.entries(teamsByCategory).map(([category, teams]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-geist-mono)]">{categoryTitles[category]}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {teams.map((team) => (
                  <div key={team.name} className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
                    <div className="aspect-video relative bg-white">
                      <TeamLogo
                        src={team.logo}
                        alt={`${team.name} logo`}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">{team.name}</h2>
                        <span className="text-sm text-foreground/70">{team.league}</span>
                      </div>
                      <span className="text-sm text-foreground/70 block mb-4">{team.conference}</span>
                      <p className="text-foreground/70 mb-4">{team.description}</p>
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
          ))}
        </div>
      </section>
    </div>
  );
} 