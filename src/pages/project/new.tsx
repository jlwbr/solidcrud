import { z } from 'zod'
import { useRouter } from 'next/router'
import Form from '../../components/Form'
import Layout from '../../components/Layout'
import { api } from '../../utils/api';

const NewProjectSchema = z.object({
    name: z.string().describe("Naam"),
    slug: z.string().optional().describe("Slug"),
    description: z.string().optional().describe("Beschrijving")
});


const New = () => {
    const router = useRouter()
    const newMuatation = api.projects.create.useMutation();

    const onSubmit = (data: z.infer<typeof NewProjectSchema>) => {
        newMuatation.mutate({
            ...data,
            slug: data.slug || data.name.toLowerCase().replace(/ /g, "-")
        }, {
            onSuccess: () => {
                void router.push("/")
            }
        })
    }

    return (
        <Layout>
            <div className="flex w-full justify-center mt-10">
                <Form
                    schema={NewProjectSchema}
                    onSubmit={onSubmit}
                    formProps={{
                        className: "w-1/3 p-2 rounded bg-base-100 shadow-xl"
                    }}
                    renderAfter={() => <button className="btn btn-primary" type="submit">
                        Opslaan
                    </button>}
                />
            </div>
        </Layout>
    )
}

export default New