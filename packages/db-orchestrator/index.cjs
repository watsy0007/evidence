const { readdirSync, readJSONSync, writeJSONSync, pathExistsSync, emptyDirSync, mkdirSync } = require('fs-extra')
const md5 = require("blueimp-md5")
const chalk = require('chalk')
const logEvent = require('@evidence-dev/telemetry')
const readline = require('readline');

const getCache = function (dev, queryString, queryTime) {
    queryTime = md5(queryTime)
    if (dev) {
        const devCache = readJSONSync("./dev/cache/" + queryTime + "/" + md5(queryString) + ".json", { throws: false })
        if (devCache) {
            logEvent("cache-query", dev)
            return devCache
        }
    }
}

const updateCache = function (dev, queryString, data, queryTime) {
    queryTime = md5(queryTime)
    if (dev) {
        if (!pathExistsSync("./dev")) {
            mkdirSync("./dev")
        }
        if (!pathExistsSync("./dev/cache/")) {
            mkdirSync("./dev/cache/")
        }
        if (!pathExistsSync("./dev/cache/" + queryTime)) {
            emptyDirSync('./dev/cache/')
            mkdirSync("./dev/cache/" + queryTime)
        }
        writeJSONSync("./dev/cache/" + queryTime + "/" + md5(queryString) + ".json", data, { throws: false })
    }
}

const validateQuery = function (query) { 
    if (query.id === 'untitled') {
        throw "Queries require a title"
    }
    if (query.id === 'evidencemeta') {
        throw "Invalid query name: 'evidencemeta'"
    }
    if (query.compiledQueryString.length === 0) {
        throw "Enter a query"
    }
    if (query.compileError) {
        throw query.compileError
    }
}

const runQueries = async function (routeHash, dev) {
    const settings = readJSONSync('./evidence.settings.json', {throws:false})

    let routePath = `./build/queries/${routeHash}`
    let queryFile = `${routePath}/${readdirSync(routePath)}`
    let queries = readJSONSync(queryFile, { throws: false }) 

    const { default: runQuery } = await import('@evidence-dev/'+ settings.database);
    
    if (queries.length > 0) {
        let data = {}
        data["evidencemeta"] = {queries} // eventually move to seperate metadata API (md frontmatter etc.) 
        for (let query of queries) {
            let queryTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours());              
            let cache = getCache(dev, query.compiledQueryString, queryTime)
            if (cache) {
                data[query.id] = cache
                process.stdout.write(chalk.greenBright("✓ "+ query.id) +  chalk.grey(" from cache \n"))
            } else {
                try {
                    process.stdout.write(chalk.grey("  "+ query.id +" running..."))
                    validateQuery(query)
                    data[query.id] = await runQuery(query.compiledQueryString, database.credentials, dev)
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(chalk.greenBright("✓ "+ query.id) + chalk.grey(" from database \n"))
                    updateCache(dev, query.compiledQueryString, data[query.id], queryTime)
                    logEvent("db-query", dev, settings)
                } catch(err) {
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(chalk.red("✗ "+ query.id) + " " + chalk.grey(err) + " \n")
                    data[query.id] = { error: { message: err } }
                    logEvent("db-error", dev, settings)
                } 
            }
        }
        return data
    }
}


const testConnection = async function (dev) {
    let query = {
        id: "Connection Test",
        compiledQueryString: "select 100 as num"
    }
    let queryResult;
    let result;
    const settings = readJSONSync('./evidence.settings.json', {throws:false})

    const { default: runQuery } = await import('@evidence-dev/'+ settings.database);

    try {
        process.stdout.write(chalk.grey("  "+ query.id +" running..."))
        queryResult = await runQuery(query.compiledQueryString, settings.credentials)
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(chalk.greenBright("✓ "+ query.id) + chalk.grey(" from database \n"))
        result = "Database Connected";
    } catch(err) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(chalk.red("✗ "+ query.id) + " " + chalk.grey(err) + " \n")
        result = err;
    } 
    return result
}

module.exports = {
    runQueries,
    testConnection
}
