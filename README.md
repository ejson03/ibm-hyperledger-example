# VSCode IBM Blockchain Platform Extension Learning
This repo contains contains examples and learning material for the course
https://cognitiveclass.ai/courses/ibm-blockchain-foundation-dev
## My Certificate
https://courses.cognitiveclass.ai/certificates/5bddf5f0ae144545af421f44ba04d342

## Learning Material 
https://github.com/ejson03/ibm-hyperledger-example/tutorials
All pdfs downloaded from the vscode extension

## Prerequisites
- Docker desktop on Windows or docker on Linux
- NodeJS

## List of experiments

### [exp1](https://github.com/ejson03/ibm-hyperledger-example/medical)
- Create a simple one organization network
- Create a smart contract, package and deploy it to channel
- Play around with transactions in UI
- Upgrade the chaincode and deploy new version

### [exp2](https://github.com/ejson03/ibm-hyperledger-example/server)
- Create a server to inject data from outide application

### [exp3](https://github.com/ejson03/ibm-hyperledger-example/carContract)
- Develop non admin users
- One with attributes and one without
- Implement attribute based access control(ABAC)

### exp4
- To implement multiple org network
- To create two peer two ca network you can choose template
- To configure for 3 org network and above 
```
export MICROFAB_CONFIG='{
    "port": 8080,
    "endorsing_organizations":[
        {
            "name": "Org1"
        },
        {
            "name": "Org2"
        },
        {
            "name": "Org3"
        }
    ],
    "channels":[
        {
            "name": "channel1",
            "endorsing_organizations":[
                "Org1",
                "Org2"
            ]
        },
        {
            "name": "channel2",
            "endorsing_organizations":[
                "Org2",
                "Org3"
            ],
            "capability_level": "V1_4_2"
        }
    ]
}'
```
- Then create the network
```
docker run -e MICROFAB_CONFIG -p 8080:8080 ibmcom/ibp-microfab
```
- Import you network in fabric environments








