import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import Link from "next/link";

import { api } from "../../../../utils/api";

const Project = () => {
    const { slug } = useRouter().query;
    const project = api.projects.getProjectBySlug.useQuery({
        slug: slug as string
    }, {
        enabled: !!slug
    });
    const connections = api.connections.getConnectionsByProjectSlug.useQuery({
        slug: slug as string
    }, {
        enabled: !!slug
    });

    return (
        <Layout title={project.data?.name}>
            <>
                <div className="flex justify-between">
                    <section className="prose pb-4"><h2>Verbindingen</h2></section>
                    <Link href="/projects/new" className="btn btn-primary">
                        Nieuwe Verbinding
                    </Link>
                </div>

                <div className="flex flex-row gap-4">
                    {connections.data?.map(({ id, name, type }) => (
                        <Link key={id} href={`/project/${slug as string}/settings/connection/${id}`} className="card w-48 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{name}</h2>
                                <p>{type}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        </Layout>
    );
};

export default Project;