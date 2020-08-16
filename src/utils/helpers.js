export const genareteScenarioList = function genareteScenarioList(scenarios)  {
    const scenarioList = scenarios.map((scenario) => {
      return scenario.scenarioName
    }
    )
    return scenarioList
  }