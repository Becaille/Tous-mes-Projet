<?php


class Token
{
    private $secretKey;
    
    /**
     * génère un token si non présent dans la session
     *
     * 
     */
    public function __construct()
    {
        if (\Session::getToken())
        {
            $this->secretKey = \Session::getToken();
        }
        else {
           $this->secretKey = md5(bin2hex(openssl_random_pseudo_bytes(6)));
        \Session::setToken($this->secretKey); 
        }
    }

    /**
     * encrypt une chaine de caractère et la renvoie
     *
     * 
     */
    
    public function encode($string):string 
    {
        return openssl_encrypt($string, "AES-128-ECB", $this->secretKey);
    }
    
    /**
     * decrypt une chaine de caractère et la renvoie
     *
     * 
     */
    public function decode(string $hash)
    {
        return openssl_decrypt($hash, "AES-128-ECB", $this->secretKey);
    }

}
