import {webTrigger} from "@forge/api"
import ForgeUI, { Fragment, GlobalSettings, render, Text, useEffect, useState } from "@forge/ui"

export const run = async () => {
  console.log("running")
  try {
    const url = await webTrigger.getUrl("triggerA")
    console.log("get url success", url)
    return {
      statusCode: 200
    }
  } catch (err) {
    console.log("get url failure", err)
    return {
      statusCode: 500
    }
  }
}

const settings = async (): Promise<[string, string]> => {
  try {
    const url = await webTrigger.getUrl("triggerA")
    console.log("get url success", url)
    return ["success", url]
  } catch (err) {
    console.log("get url failure", err)
    return ["failure", JSON.stringify(err)]
  }
}

const App = () => {
  const [url, setUrl] = useState("")
  const [state, setState] = useState("")
  useEffect(async () => {
    const [newState, newUrl] = await settings()
    setState(newState)
    setUrl(newUrl)
  }, [])
  return (
    <Fragment>
      <Text>Trigger Url: {url}</Text>
      <Text>State: {state}</Text>
    </Fragment>
  )
};

export const runSettings = render(
  <GlobalSettings>
    <App />
  </GlobalSettings>
);