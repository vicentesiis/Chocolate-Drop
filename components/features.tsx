import { BookCheck, ChartPie, FolderSync, Goal, Users, Zap } from "lucide-react";
import { useId } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  {
    icon: Goal,
    title: "Identify Opportunities",
    description: "Easily uncover untapped areas to explore and expand your reach effortlessly.",
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description:
      "Create valuable content that resonates, inspires trust, and positions you as an expert.",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description:
      "Gain immediate, actionable insights with a quick glance, enabling fast decision-making.",
  },
  {
    icon: Users,
    title: "Engage with Your Audience",
    description:
      "Boost audience engagement with interactive features like polls, quizzes, and forms.",
  },
  {
    icon: FolderSync,
    title: "Automate Your Workflow",
    description:
      "Streamline your processes by automating repetitive tasks, saving time and reducing effort.",
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description:
      "Supercharge your growth by implementing strategies that drive results quickly and efficiently.",
  },
];

const Features = () => {
  return (
    <div
      id={useId()}
      className={`
        mx-auto w-full max-w-(--breakpoint-xl) px-6 py-12
        xs:py-20
      `}
    >
      <h2
        className={`
          text-3xl font-bold tracking-tight
          xs:text-4xl
          sm:mx-auto sm:max-w-xl sm:text-center
          md:text-5xl md:leading-[3.5rem]
        `}
      >
        Boost Your Strategy with Smart Features
      </h2>
      <div
        className={`
          mx-auto mt-8 grid w-full gap-x-10 gap-y-12
          xs:mt-14
          md:grid-cols-2
          lg:grid-cols-3
        `}
      >
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col overflow-hidden rounded-xl border shadow-none"
          >
            <CardHeader>
              <feature.icon />
              <h4 className="mt-3! text-xl font-bold tracking-tight">{feature.title}</h4>
              <p
                className={`
                  mt-1 text-sm text-muted-foreground
                  xs:text-[17px]
                `}
              >
                {feature.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto px-0 pb-0">
              <div className="ml-6 h-52 rounded-tl-xl bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
