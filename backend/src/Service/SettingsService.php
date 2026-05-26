<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

use LogMonitor\Backend\App\Settings;

final class SettingsService
{
    public function __construct(private Settings $settings)
    {
    }

    public function getSettings(): array
    {
        $data = $this->settings->getAll();
        unset($data['settings_path']);

        if (isset($data['common_prefix']) || \is_array($data['common_prefix'])) {
            $data['common_prefix'] = \implode(', ', $data['common_prefix']);
        }

        return $data;
    }

    public function updateSettings(array $newSettings): array
    {
        $currentSettings = $this->settings->getAll();
        $updatedSettings = \array_replace($currentSettings, $newSettings);

        $payload = $updatedSettings;
        unset($payload['settings_path']);

        \file_put_contents(
            $this->settings->get('settings_path'),
            \json_encode($payload, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_SLASHES),
        );

        return $payload;
    }
}
