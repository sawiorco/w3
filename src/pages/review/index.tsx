import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

export default function Review() {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>List of games</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>

      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}
