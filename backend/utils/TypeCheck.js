import z from "zod";

const signupcheck = z.object({
    username: z.string({message:"enter a username"}),
    email:z.string({message:"enter a correct gamil"}).email(),
	password: z.string().min(6)
})

const signinCheck =z.object({
    email:z.string().email(),
    password:z.string().min(6)
})


export { signupcheck , signinCheck}