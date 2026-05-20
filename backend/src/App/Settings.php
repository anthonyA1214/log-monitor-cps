<?php

declare(strict_types=1);

namespace LogMonitor\Backend\App;

class Settings
{
    public function __construct(private readonly array $data) {}

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->data[$key] ?? $default;
    }

    public function getAll(): array
    {
        return $this->data;
    }
}
