<?php

class SmmApi
{
    private $api_url;
    private $api_key;

    public function __construct($api_url, $api_key)
    {
        $this->api_url = $api_url;
        $this->api_key = $api_key;
    }

    public function order($data)
    {
        $post = array_merge(['key' => $this->api_key, 'action' => 'add'], $data);
        return $this->connect($post);
    }

    public function status($order_id)
    {
        return $this->connect([
            'key' => $this->api_key,
            'action' => 'status',
            'order' => $order_id
        ]);
    }

    public function multiStatus($order_ids)
    {
        return $this->connect([
            'key' => $this->api_key,
            'action' => 'status',
            'orders' => implode(",", $order_ids)
        ]);
    }

    public function services()
    {
        return $this->connect([
            'key' => $this->api_key,
            'action' => 'services',
        ]);
    }

    public function balance()
    {
        return $this->connect([
            'key' => $this->api_key,
            'action' => 'balance',
        ]);
    }

    private function connect($post)
    {
        $ch = curl_init($this->api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)');
        $result = curl_exec($ch);
        if (curl_errno($ch) != 0 && empty($result)) {
            $result = false;
        }
        // curl_close($ch); is deprecated in PHP 8.0+ / 8.5
        return $result;
    }
}
?>
