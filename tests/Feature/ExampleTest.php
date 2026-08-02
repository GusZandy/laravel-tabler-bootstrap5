<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * The package config should be merged into the application config.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertSame('zandy', config('tabler.company_name'));
    }
}
