import { NextResponse, NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })

  try {


    const authHeader = req.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 })
    }


    await payload.jobs.queue({
      task: 'healthCheck',
      queue: 'healthCheck',
      input: {},
    })

    const results = await payload.jobs.run({ queue: 'healthCheck' })

    payload.logger.info('Health check successful')

    return NextResponse.json({
      success: true,
      message: 'Health check job queued and executed successfully',
      timestamp: new Date().toISOString(),
      jobsProcessed: Array.isArray(results) ? results.length : 0,
    })
  } catch (e) {
    payload.logger.error({ err: e }, 'Health check runner error')
    return NextResponse.json({
      error: 'Failed to run health check',
      details: e instanceof Error ? e.message : 'Unknown error',
    }, {
      status: 500,
    })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}