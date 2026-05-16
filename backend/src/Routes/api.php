<?php

/** @var \Slim\App $app */

$app->get('/hello', function ($request, $response, $args) {
    $response->getBody()->write("Hello from API!");
    return $response;
});
