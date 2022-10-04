import { test, expect } from '@playwright/test'
import { reqResponse, info, pass, warning} from '../utils/logger'
const requestOptions = { 
  failOnStatusCode: false, 
  timeout: 5000,
}
const authHeader = {
  'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
}

/**
 * API Demo suite for Playwright páge
 */
test.describe('Playwright API testing suite', () => {

  test.skip('should fail because of wrong welcoming message', async ({ request }) => {
    const res = await request.get('/welcome', requestOptions)
    const resBody = await res.json()
    await info('Asserting response status code 200...')
    expect(res.status()).toEqual(200)
    await pass('Successfully validated 200 OK!')
    await info('Asserting response body...')
    expect(resBody.message).toEqual('Adios prrrowww!')
    await pass('Successfully validated response!')  
    await reqResponse(resBody)
  })

  test('should GET a welcoming message', async ({ request }) => {
    const res = await request.get('/welcome', requestOptions)
    const resBody = await res.json()
    await info('Asserting response status code 200...')
    expect(res.status()).toEqual(200)
    await pass('Successfully validated 200 OK!')
    await info('Asserting response body...')
    expect(resBody.message).toEqual('Welcome my friend!')
    await pass('Successfully validated response!')  
    await reqResponse(resBody)
  })

  test('should fail to GET employees without credentials', async ({ request }) => {
    const res = await request.get('/company/employees', requestOptions)
    const resBody = await res.json()
    await warning('Asserting response status code 401...')
    expect(res.status()).toEqual(401)
    await pass('Successfully validated 401 Unauthorized!')
    await info('Asserting response body...')
    expect(resBody.message).toContain('You don\'t have enough privileges')
    await pass('Successfully validated response!')
    await reqResponse(resBody)
  })

  test('should GET all employees using basic credentials', async ({ request }) => {
    const res = await request.get('/company/employees', {
      ...requestOptions,
      headers: authHeader,
    })
    const resBody = await res.json()
    await info('Asserting response status code 200...')
    expect(res.status()).toEqual(200)
    await pass('Successfully validated 200 OK!')
    await info('Asserting response body...')
    expect(resBody.employees.length).toBeGreaterThanOrEqual(1)
    await pass('Successfully validated response!')
    await reqResponse(resBody)
  })

  test('should GET a specific employee', async ({ request }) => {
    const employeeID = 2
    const res = await request.get(`/company/employees/${employeeID}`, {
      ...requestOptions,
      headers: authHeader,
    })
    const resBody = await res.json()
    await info('Asserting response status code 200...')
    expect(res.status()).toEqual(200)
    await pass('Successfully validated 200 OK!')
    await info('Asserting response body...')
    expect(resBody.id).toEqual(employeeID)
    await pass('Successfully validated response!')
    await reqResponse(resBody)
  })

})
