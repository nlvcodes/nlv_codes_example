import { NextRequest, NextResponse } from 'next/server'
import { getPayload, PayloadRequest } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })
  try {
    const authHeader = req.headers.get('Authorization')
    console.log(req.headers)
    const cronSecret = process.env.CRON_SECRET
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    await payload.jobs.queue({
      task: 'healthCheck',
      queue: 'healthCheck',
      input: {},
    })

    await payload.jobs.run({
      queue: 'healthCheck',
      limit: 1,
    })


    payload.logger.info(`Health check run at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`)

    return NextResponse.json({
      success: true,
      message: 'Health check job queued and executed',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    payload.logger.error({ msg: `Health check runner error: ${error}` })
    return NextResponse.json(
      { error: 'Failed to run health check', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}