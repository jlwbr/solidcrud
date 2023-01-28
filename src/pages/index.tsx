import { type NextPage } from "next";
import Link from "next/link";

import { api } from "../utils/api";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const projects = api.projects.getUserProjects.useQuery();

  if (projects.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <>
        <div className="flex justify-between">
          <section className="prose pb-4"><h2>Jouw projecten</h2></section>
          <Link href="/projects/new" className="btn btn-primary">
            Nieuw project
          </Link>
        </div>

        <div className="flex flex-row gap-4">
          {projects.data?.map(({ id, name, slug, description }) => (
            <Link key={id} href={`/project/${slug}`} className="card w-48 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Home;
