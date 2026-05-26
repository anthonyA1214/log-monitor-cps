<?php

declare(strict_types=1);

use Ergebnis\PhpCsFixer\Config;
use PhpCsFixer\Finder;

$ruleSet = Config\RuleSet\Php82::create()->withRules(Config\Rules::fromArray([
    'binary_operator_spaces' => [
        'default'   => 'align',
        'operators' => [
            '=>' => 'align_single_space_by_scope',
        ],
    ],
]));

$finder = Finder::create()->in(__DIR__);

$config = Config\Factory::fromRuleSet($ruleSet);

$config->setCacheFile(__DIR__ . '/.build/php-cs-fixer/.php-cs-fixer.cache');
$config->setFinder($finder);

return $config;