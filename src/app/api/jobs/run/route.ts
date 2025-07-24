import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })
  try {
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret && authHeader !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const results = await payload.jobs.run({
      queue: 'default',
    })

    // we'll log the execution of the task at my desired date and time
    payload.logger.info({msg: `Jobs runner executed at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`})

    const jobsProcessed = Array.isArray(results) ? results.length : 0
    payload.logger.info({msg: `Jobs processed: ${jobsProcessed}`})

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results: {
        total: jobsProcessed,
        details: results
      }
    })
  } catch (e) {
    payload.logger.error({msg: 'Jobs runner error:', e})
    return NextResponse.json(
      { error: 'Failed to run jobs', details: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}