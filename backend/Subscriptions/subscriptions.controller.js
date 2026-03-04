import axios from "axios";
import fetch from "node-fetch";

const plans = [
    {
        plan_id: "P-7R5457436T372114LM4STPGY",
        plan_name: "Basic Plan",
        duration: 'month',
    },
    {
        plan_id: "P-36H51700L8327792DM4STQKI",
        plan_name: "Pro Plan",
        duration: 'month',
    },
    {
        plan_id: "P-39U95890GH041215FM4STQ5I",
        plan_name: "CloudSphere Plan",
        duration: 'month',
    },
]

const generateAccessToken = async () => {
    try {
        const clientId = "ATzYPfw2mRRRSLI69BmDRPZRVL1NEwF_vCIP-HCcpTE_dURMDpo-sma_st9pafz7ed6hCc8fDOekg6MN";
        const clientSecret = "EAKwGy02JGaGCV1T2FuMdRIJ00cvvi86jgNZLO1PDhyoXhGcPAiG1-jrLnnKktWOwbjC6MmJb59YXxP2";
        const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
    
        if (!clientId || !clientSecret) {
            throw new Error("Paypal credentials not found");
        }
    
        const auth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    
        const response = await fetch(url, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            }
        })

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.log("Error in generateAccessToken ", error);
        return
    }
}

export const createSubscription = async (req, res) => {
    const { plan_name, duration, price } = req.body;
    const plan = plans.find(_plan => _plan.duration === duration && _plan.plan_name === plan_name);


    if (!plan) {
        return res.status(400).json({ success: false, message: "Plan not found" });
    }

    const url = "https://api-m.sandbox.paypal.com/v1/billing/subscriptions";

    const accessToken = await generateAccessToken();

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
            Prefer: "return=representation",
        },
        body: JSON.stringify({
            plan_id: plan.plan_id,
            plan: {
                billing_cycles: [
                    {
                        tenure_type: "REGULAR",
                        sequence: 1,
                        total_cycles: 0,
                        pricing_scheme: {
                            fixed_price: {
                                value: price,
                                currency_code: "USD",
                            }
                        }
                    }
                ],
            },
            application_context: {
                user_action: "SUBSCRIBE_NOW",
            }
        })

    })

    const data = await response.json();

    res.status(200).json({ paypalSubscriptionId: data, status: data.status });    
};

export const savePayment = async (req, res) => {
    const { orderID, subscriptionID } = req.body;
    
    if (!orderID || !subscriptionID) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const url = `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`;

    const accessToken = await generateAccessToken();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Prefer: "return=representation",
            Authorization: `Bearer ${accessToken}`,
        }
    })

    const paypalData = await response.json();

    return res.status(200).json({ success: true, message: "Payment saved", data: paypalData });
}

async function getSubscriptionDetails(subId) {
    const access_token = await generateAccessToken();

    const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subId}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    })

    return response.data;
}

export const cancelSubscritpion = async (req, res) => {

    const { subId } = req.body
    try {
        console.log("subId", subId);
        const access_token = await generateAccessToken();

        const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subId}/cancel`;

        const data = {
            reason: "Canceled by the user"
        }

        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })

        res.status(200).json({ success: true, message: "Subscription canceled" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
}