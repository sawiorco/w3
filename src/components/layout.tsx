import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { Header } from "./header"
import { Proscons } from "./proscons"
import { Features } from "./features"
import { Section } from "./section"
import { List } from "./list"
import { Checklist } from "./checklist/"

const shortcodes = { Proscons, Features, Section, List, Checklist }

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <MDXProvider components={shortcodes}>
      <div className="flex flex-col h-screen">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

        <main className="flex-grow">{children}</main>

        <footer className="py-5 bg-gray-800">
          <div className="container mx-auto">
            Sawior &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </MDXProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
