/**
 * Cloudflare Pages Function for GitHub OAuth token exchange
 * Handles the OAuth token exchange for Decap CMS authentication
 */

export async function onRequestPost({ request, env }) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const { code, state } = await request.json()

    if (!code) {
      return new Response(JSON.stringify({
        error: 'Authorization code is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GitHub OAuth token exchange
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Tech.C-Venture-CMS/1.0'
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
        state: state
      })
    })

    if (!tokenResponse.ok) {
      throw new Error(`GitHub API error: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      throw new Error(`GitHub OAuth error: ${tokenData.error_description || tokenData.error}`)
    }

    // ユーザー情報を取得してアクセス権限を確認
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'User-Agent': 'Tech.C-Venture-CMS/1.0'
      }
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user information')
    }

    const userData = await userResponse.json()

    // リポジトリへのアクセス権限をチェック
    const repoResponse = await fetch('https://api.github.com/repos/Tech-C-Venture/HP', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'User-Agent': 'Tech.C-Venture-CMS/1.0'
      }
    })

    if (!repoResponse.ok) {
      return new Response(JSON.stringify({
        error: 'Access denied: You do not have permission to access this repository'
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // 成功レスポンス（Decap CMS が期待する形式）
    return new Response(JSON.stringify({
      token: tokenData.access_token,
      provider: 'github',
      expires_at: tokenData.expires_in ?
        new Date(Date.now() + tokenData.expires_in * 1000).toISOString() :
        null
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })

  } catch (error) {
    console.error('OAuth error:', error)

    return new Response(JSON.stringify({
      error: 'Authentication failed',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// CORS preflight request handling
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}