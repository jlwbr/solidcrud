import { z } from 'zod'
import { useRouter } from 'next/router'
import Form, { EnumField } from '../../../../../components/Form'
import Layout from '../../../../../components/Layout'
import { api } from '../../../../../utils/api';

const NewProjectSchema = z.object({
    name: z.string().describe("Naam"),
    type: EnumField.describe("Soort"),
    host: z.string().describe("Host"),
    port: z.number().describe("Poort"),
    username: z.string().describe("Gebruikersnaam"),
    password: z.string().describe("Wachtwoord"),
    database: z.string().describe("Database")
});


const Connection = () => {
    const router = useRouter()
    const { id } = router.query
    const testConnection = api.connections.testConnection.useMutation();

    const onSubmit = (data: z.infer<typeof NewProjectSchema>) => {
        console.log(data)
    }

    const onTestConnection = () => {
        testConnection.mutate({
            id: id as string
        }, {
            onSuccess: () => {
                alert("Connection successful")
            },
            onError: ({ message }) => {
                alert(`Connection failed: "${message}"`)
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
                    props={{
                        type: {
                            options: ["mysql"]
                        }
                    }}
                    renderAfter={({ submit }) => <>
                        <button onClick={submit} className="btn btn-accent mr-2" type="submit">
                            Opslaan
                        </button>
                        <button onClick={onTestConnection} className="btn btn-primary">
                            Test verbinding
                        </button>
                    </>}
                />
            </div>
        </Layout>
    )
}

export default Connection