import prisma from '../db/client'
import Mailjet from 'node-mailjet'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string }>(event)
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC!,
        process.env.MJ_APIKEY_PRIVATE!
    )
    if (!body.email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        })

        if (existingUser) {
            return { success: false, user: existingUser, message: 'Email already subscribed' }

        }
    } catch (error) {
        console.error('Error checking existing user:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
    }


    const result = await prisma.user.create({
        data: { email: body.email }
    })
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'deneme@murat.com',
                    Name: 'Murat Deneme'
                },
                To: [
                    {
                        Email: body.email,
                        Name: 'Subscriber'
                    }
                ],
                Subject: 'Deneme Mail',
                TextPart: 'Deneme',
                HTMLPart: `Deneme`
            }
        ]
    })
    try {
        await request
    } catch (error) {
        console.log(error)
    }


    return { success: true, user: result }
})
