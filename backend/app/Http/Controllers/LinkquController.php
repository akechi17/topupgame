<?php

namespace App\Http\Controllers;

use App\Models\Qris;
use App\Models\Transaction;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Validator;

class LinkquController extends Controller
{
    // public function topup(Request $request)
    // {
    //     // $clientID = "testing";
    //     // $clientSecret = '123';
    //     // $baseUrl = "https://gateway-dev.linkqu.id";
    //     // $username = 'LI307GXIN';
    //     // $pin = '2K2NPCBBNNTovgB';
    //     // $signatureKey = 'LinkQu@2020';

    //     // $amount ="99999";
    //     // $partnerReff = "699886";
    //     // $customerId = "65778";
    //     // $customerName = "abkdbkasbd";
    //     // $expired = "20240528110542";
    //     // $customerPhone = "0899999999";
    //     // $customerEmail = "aang@aang.id";
    //     // $bankCode = "028";
    //     // $urlCallback = "http://127.0.0.1:8000";
        
    //     // $combine="$amount$expired$bankCode$partnerReff$customerId$customerName$customerEmail$clientID";
    //     // $signToStringClean = preg_replace("/[^a-zA-Z0-9]/", "", $combine);
    //     // $signToString = "/transaction/create/vaPOST$signToStringClean";
    //     // $signature = hash_hmac('sha256', $signToString, $signatureKey);
    //     // // $test="/transaction/create/vaPOST999992024052811054202869988665778abkdbkasbdaangaangidtesting";
    //     // dd($signature, $signToString,"/transaction/create/vaPOST999992024052811054202869988665778abkdbkasbdaangaangidtesting");

    //     // $data = [
    //     //     'username' => 'LI307GXIN',
    //     //     'pin' => '2K2NPCBBNNTovgB',
    //     //     'amount' => $request->input('amount'),
    //     //     'product_code' => $request->input('product_code'),
    //     //     'customer_id' => $request->input('customer_id'),
    //     // ];

    //     // $signature = hash_hmac('sha256', json_encode($data), $signatureKey);

    //     // $client = new Client();
    //     // try {
    //     //     $response = $client->post('https://gateway-dev.linkqu.id', [
    //     //         'headers' => [
    //     //             'client-id' => $clientId,
    //     //             'client-secret' => $clientSecret,
    //     //             'signature' => $signature,
    //     //             'Content-Type' => 'application/json',
    //     //         ],
    //     //         'json' => $data
    //     //     ]);

    //     //     return response()->json(json_decode($response->getBody()->getContents()));
    //     // } catch (\Exception $e) {
    //     //     return response()->json(['error' => $e->getMessage()], 500);
    //     // }
    // }

    function changeHash($combine,$path,$serverKey){
        $signToStringClean = preg_replace("/[^a-zA-Z0-9]/", "", $combine);
        $signToString = $path.strtolower($signToStringClean);
        $signature = hash_hmac('sha256', $signToString, $serverKey);
        return $signature;
    }

    
    function generateUniqueRandomNumber()
    {
        do {
            $randomNumber = mt_rand(10000, 99999); // Generate a random number between 10000 and 99999
            $exists = Transaction::where('partner_reff', "$randomNumber")->exists();
        } while ($exists);

        return $randomNumber;
    }

    function generateRandomNumber()
    {
        $randomNumber = mt_rand(10000, 99999);
        $exists = Transaction::where('customer_id', "$randomNumber")->exists();
        if($exists) return false;
        return $randomNumber;
    }

    public function createVirtualAccount(Request $request)
    {
        $clientID = "testing";
        $clientSecret = '123';
        $baseUrl = "https://gateway-dev.linkqu.id";
        $username = 'LI307GXIN';
        $pin = '2K2NPCBBNNTovgB';
        $signatureKey = 'LinkQu@2020';

        $amount = $request->input('amount');
        $partnerReff = (string)$this->generateUniqueRandomNumber();
        $customerId =(string)$this->generateRandomNumber();
        $customerName = $request->input('customer_name');
        $expired = $request->input('expired');
        $request['customer_phone'] = $request->input('customer_phone');
        $customerEmail = $request->input('customer_email');
        $bankCode = $request->input('bank_code');
        $urlCallback = "https://531c-2404-c0-5c10-00-b451-9f96.ngrok-free.app/v1/callbackVa";

        $combine="$amount$expired$bankCode$partnerReff$customerId$customerName$customerEmail$clientID";
        $signature= $this->changeHash($combine,"/transaction/create/vaPOST",$signatureKey);

        $request->merge([
            'username' => $username,
            'pin' => $pin,
            'signature' => $signature,
            'url_callback' => $urlCallback,
            'partner_reff' => $partnerReff,
            'customer_id' => $customerId
        ]);

        try {
            $response = Http::withHeaders([
                'client-id' => $clientID,
                'client-secret' => $clientSecret,
            ])->post($baseUrl . '/linkqu-partner/transaction/create/va', $request->all());

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                // Log error response from LinkQu
                Log::error('LinkQu API Error', ['response' => $response->json()]);
                return response()->json(['error' => 'Failed to create virtual account', 'details' => $response->json()], $response->status());
            }
        } catch (\Exception $e) {
            // Log exception details
            Log::error('Exception in createVirtualAccount', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    // public function checkTransactionStatus(Request $request)
    // {
    //     // Validasi input
    //     $validator = Validator::make($request->all(), [
    //         'username' => 'required|string',
    //         'partnerreff' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     // Dapatkan data dari request
    //     $username = $request->input('username');
    //     $partnerReff = $request->input('partnerreff');

    //     // Lakukan panggilan API untuk memeriksa status transaksi
    //     try {
    //         $response = Http::withHeaders([
    //             'client-id' => config('linkqu.client_id'),
    //             'client-secret' => config('linkqu.client_secret'),
    //         ])->get(config('linkqu.base_url') . '/linkqu-partner/transaction/payment/checkstatus', [
    //             'username' => $username,
    //             'partnerreff' => $partnerReff,
    //         ]);

    //         if ($response->successful()) {
    //             return response()->json($response->json());
    //         } else {
    //             return response()->json(['error' => 'Failed to retrieve transaction status'], $response->status());
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
    //     }
    // }
    // public function handleCallback(Request $request)
    // {
    //     Log::info('Callback received', ['request' => $request->all()]);

    //     $data = $request->all();

    //     // Verifikasi signature
    //     $signatureString = "{$data['partner_reff']}{$data['amount']}{$data['va_number']}{$data['username']}";
    //     $serverKey = env('LINKQU_SERVER_KEY');
    //     $expectedSignature = hash_hmac('sha256', $signatureString, $serverKey);

    //     Log::info('Signature verification', ['expected' => $expectedSignature, 'received' => $data['signature']]);

    //     if ($expectedSignature !== $data['signature']) {
    //         Log::error('Invalid signature', ['expected' => $expectedSignature, 'received' => $data['signature']]);
    //         return response()->json(['error' => 'Invalid signature'], 400);
    //     }

    //     // Cari transaksi berdasarkan partner_reff
    //     $transaction = Transaction::where('partner_reff', $data['partner_reff'])->first();

    //     if (!$transaction) {
    //         Log::error('Transaction not found', ['partner_reff' => $data['partner_reff']]);
    //         return response()->json(['error' => 'Transaction not found'], 404);
    //     }

    //     // Perbarui status transaksi
    //     $transaction->status = $data['status'];
    //     $transaction->save();

    //     Log::info('Transaction updated', ['transaction' => $transaction]);

    //     return response()->json(['response' => 'OK'], 200);
    // }


    public function createRetailPayment(Request $request)
    {
        $clientID = "testing";
        $clientSecret = '123';
        $baseUrl = "https://gateway-dev.linkqu.id";
        $username = 'LI307GXIN';
        $pin = '2K2NPCBBNNTovgB';
        $signatureKey = 'LinkQu@2020';

        $request->validate([
            'amount' => 'required|integer|min:15000|max:2500000',
            'customer_name' => 'required',
            'expired' => 'required|date_format:YmdHis|after:now',
            'customer_phone' => 'required',
            'customer_email' => 'required|email',
        ]);

        $amount = $request->input('amount');
        $partnerReff = (string)$this->generateUniqueRandomNumber();
        $customerId =(string)$this->generateRandomNumber();
        $customerName = $request->input('customer_name');
        $expired = $request->input('expired');
        $customerEmail = $request->input('customer_email');
        $retailCode = $request->input('retail_code');
        $urlCallback = "127.0.0.1:8000";

        $combine ="$amount$expired$retailCode$partnerReff$customerId$customerName$customerEmail$clientID";
        $signature=$this->changeHash($combine, "/transaction/create/retailPOST", $signatureKey);

        $request->merge([
            'username' => $username,
            'pin' => $pin,
            'signature' => $signature,
            'url_callback' => $urlCallback,
            'partner_reff' => $partnerReff,
            'customer_id' => $customerId
        ]);

        try {
              // Send POST request
            $response = Http::withHeaders([
                'client-id' => $clientID,
                'client-secret' => $clientSecret,
            ])->post($baseUrl . '/linkqu-partner/transaction/create/retail', $request->all());

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => $response->body()], $response->status());
            }

        }catch(\Exception $e){
            Log::error('Exception in createVirtualAccount', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
      
    }

    public function createQris(Request $request)
    {
        $clientID = "testing";
        $clientSecret = '123';
        $baseUrl = "https://gateway-dev.linkqu.id";
        $username = 'LI307GXIN';
        $pin = '2K2NPCBBNNTovgB';
        $signatureKey = 'LinkQu@2020';

        $request->validate([
            'amount' => 'required|integer|min:1000|max:20000000',
            'customer_name' => 'required',
            'expired' => 'required|date_format:YmdHis|after:now',
            'customer_phone' => 'required',
            'customer_email' => 'required|email',
        ]);

        $amount = $request->input('amount');
        $partnerReff = (string)$this->generateUniqueRandomNumber();
        $customerId =(string)$this->generateRandomNumber();
        $customerName = $request->input('customer_name');
        $expired = $request->input('expired');
        $customerEmail = $request->input('customer_email');
        $urlCallback ="127.0.0.1:8000";

        $combine ="$amount$expired$partnerReff$customerId$customerName$customerEmail$clientID";
        $signature=$this->changeHash($combine, "/transaction/create/qrisPOST", $signatureKey);

        $request->merge([
            'username' => $username,
            'pin' => $pin,
            'signature' => $signature,
            'url_callback' => $urlCallback,
            'partner_reff' => $partnerReff,
            'customer_id' => $customerId
        ]);

        try{
            $response = Http::withHeaders([
                'client-id' => $clientID,
                'client-secret' => $clientSecret,
            ])->post("$baseUrl/linkqu-partner/transaction/create/qris",  $request->all());
    
            if ($response->successful()) {
                Transaction::create($request->all());
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Failed to create QRIS transaction'], 500);
            }
        }catch(\Exception $e){
            Log::error('Exception in createVirtualAccount', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    public function createOvoPush(Request $request)
    {
        $clientID = "testing";
        $clientSecret = '123';
        $baseUrl = "https://gateway-dev.linkqu.id";
        $username = 'LI307GXIN';
        $pin = '2K2NPCBBNNTovgB';
        $signatureKey = 'LinkQu@2020';

        $request->validate([
            'amount' => 'required|integer|min:15000|max:2500000',
            'customer_name' => 'required',
            'expired' => 'required|date_format:YmdHis|after:now',
            'customer_phone' => 'required',
            'customer_email' => 'required|email',
            'ewallet_phone' => 'required',
            'bill_title' => 'nullable',
        ]);

        $amount = $request->input('amount');
        $partnerReff = (string)$this->generateUniqueRandomNumber();
        $customerId =(string)$this->generateRandomNumber(); 
        $customerName = $request->input('customer_name');
        $expired = $request->input('expired');
        $customerEmail = $request->input('customer_email');
        $ewalletPhone = $request->input('ewallet_phone');
        $urlCallback="127.0.0.1:8000";
        $retailCode="PAYOVO";


        $combine ="$amount$expired$retailCode$partnerReff$customerId$customerName$customerEmail$ewalletPhone$clientID";
        $signature=$this->changeHash($combine, "/transaction/create/ovopush/asyncPOST", $signatureKey);

        $request->merge([
            'username' => $username,
            'pin' => $pin,
            'signature' => $signature,
            'url_callback' => $urlCallback,
            'retail_code' => $retailCode,
            'partner_reff' => $partnerReff,
            'customer_id' => $customerId
        ]);

        try{
            $response = Http::withHeaders([
                'client-id' => $clientID,
                'client-secret' => $clientSecret ,
            ])->post("$baseUrl/linkqu-partner/transaction/create/ovopush/async", $request->all());

            Transaction::create($request->all());
            return response()->json($response->json());
        }catch(\Exception $e){
            Log::error('Exception in createVirtualAccount', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    public function createPaymentEwallet(Request $request)
    {
        $clientID = "testing";
        $clientSecret = '123';
        $baseUrl = "https://gateway-dev.linkqu.id";
        $username = 'LI307GXIN';
        $pin = '2K2NPCBBNNTovgB';
        $signatureKey = 'LinkQu@2020';

        $request->validate([
            'amount' => 'required|integer|min:15000|max:2500000',
            'customer_name' => 'required',
            'expired' => 'required|date_format:YmdHis|after:now',
            'customer_phone' => 'required',
            'customer_email' => 'required|email',
            'retail_code' => 'required',
            'ewallet_phone' => 'required',
            'bill_title' => 'nullable',
        ]);

        $amount = $request->input('amount');
        $partnerReff = (string)$this->generateUniqueRandomNumber();
        $customerId =(string)$this->generateRandomNumber(); 
        $customerName = $request->input('customer_name');
        $expired = $request->input('expired');
        $customerEmail = $request->input('customer_email');
        $ewalletPhone = $request->input('ewallet_phone');
        $retailCode = $request->input('retail_code');
        $urlCallback = 'http://127.0.0.1:8000';


        $combine ="$amount$expired$retailCode$partnerReff$customerId$customerName$customerEmail$ewalletPhone$clientID";
        $signature=$this->changeHash($combine, "/transaction/create/paymentewalletPOST", $signatureKey);
        
        $request->merge([
            'username' => $username,
            'pin' => $pin,
            'signature' => $signature,
            'url_callback' => $urlCallback,
            'partner_reff' => $partnerReff,
            'customer_id' => $customerId
        ]);    

        try{
            $response = Http::withHeaders([
                'client-id' => $clientID,
                'client-secret' => $clientSecret,
                'Content-Type' => 'application/json',
            ])->post($baseUrl . '/linkqu-partner/transaction/create/paymentewallet', $request->all());
            return $response->json();
        }catch(\Exception $e){
            Log::error('Exception in createVirtualAccount', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

}
