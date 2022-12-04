import { KendraClient } from "@aws-sdk/client-kendra"

const client = new KendraClient({ region: "us-east-1"})

export const handler = async() => {
  var params = {
    EntityList: [
      {
        EntityId: "",
        
      }
    ]
  }
}

handler()